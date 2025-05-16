'use server'

import { auth } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'
import { ACTION, ENTITY_TYPE } from '@prisma/client'

import { prisma } from '@/lib/db'
import { createAuditLog } from '@/lib/create-audit-log'
import { CreateCard } from '@/actions/create-card/schema'
import { createSafeAction } from '@/lib/create-safe-action'
import { InputType, ReturnType } from '@/actions/create-card/types'

const handler = async (data: InputType): Promise<ReturnType> => {
	const { userId, orgId } = await auth()

	if (!userId || !orgId) {
		return { error: 'Unauthorized' }
	}

	const { title, boardId, listId } = data

	let card

	try {
		const list = await prisma.list.findUnique({ where: { id: listId, board: { orgId } } })

		if (!list) {
			return { error: 'List not found' }
		}

		const lastCard = await prisma.card.findFirst({
			where: { listId },
			orderBy: { order: 'desc' },
			select: { order: true },
		})

		const newOrder = lastCard ? lastCard.order + 1 : 1

		card = await prisma.card.create({ data: { title, listId, order: newOrder } })

		await createAuditLog({
			action: ACTION.CREATE,
			entityId: card.id,
			entityType: ENTITY_TYPE.CARD,
			entityTitle: card.title,
		})
	} catch (error) {
		return { error: 'Failed to create' }
	}

	revalidatePath(`/board/${boardId}`)
	return { data: card }
}

export const createCard = createSafeAction(CreateCard, handler)
