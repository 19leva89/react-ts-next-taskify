'use server'

import { auth } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'
import { ACTION, ENTITY_TYPE } from '@prisma/client'

import { prisma } from '@/lib/db'
import { CopyList } from '@/actions/copy-list/schema'
import { createAuditLog } from '@/lib/create-audit-log'
import { createSafeAction } from '@/lib/create-safe-action'
import { InputType, ReturnType } from '@/actions/copy-list/types'

const handler = async (data: InputType): Promise<ReturnType> => {
	const { userId, orgId } = await auth()

	if (!userId || !orgId) {
		return { error: 'Unauthorized' }
	}

	const { id, boardId } = data

	let list

	try {
		const listToCopy = await prisma.list.findUnique({
			where: { id, boardId, board: { orgId } },
			include: { cards: true },
		})

		if (!listToCopy) {
			return { error: 'List not found' }
		}

		const lastList = await prisma.list.findFirst({
			where: { boardId },
			orderBy: { order: 'desc' },
			select: { order: true },
		})

		const newOrder = lastList ? lastList.order + 1 : 1

		list = await prisma.list.create({
			data: {
				title: `${listToCopy.title} - Copy`,
				boardId: listToCopy.boardId,
				order: newOrder,
				cards: {
					createMany: {
						data: listToCopy.cards.map((card) => ({
							title: card.title,
							description: card.description,
							order: card.order,
						})),
					},
				},
			},
			include: { cards: true },
		})

		await createAuditLog({
			action: ACTION.CREATE,
			entityId: list.id,
			entityType: ENTITY_TYPE.LIST,
			entityTitle: list.title,
		})
	} catch {
		return { error: 'Failed to copy' }
	}

	revalidatePath(`/board/${boardId}`)
	return { data: list }
}

export const copyList = createSafeAction(CopyList, handler)
