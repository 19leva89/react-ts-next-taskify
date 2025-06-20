'use server'

import { auth } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'
import { ACTION, ENTITY_TYPE } from '@prisma/client'

import { prisma } from '@/lib/db'
import { CopyCard } from '@/actions/copy-card/schema'
import { createAuditLog } from '@/lib/create-audit-log'
import { createSafeAction } from '@/lib/create-safe-action'
import { InputType, ReturnType } from '@/actions/copy-card/types'

const handler = async (data: InputType): Promise<ReturnType> => {
	const { userId, orgId } = await auth()

	if (!userId || !orgId) {
		return { error: 'Unauthorized' }
	}

	const { id, boardId } = data

	let card

	try {
		const cardToCopy = await prisma.card.findUnique({ where: { id, list: { board: { orgId } } } })

		if (!cardToCopy) {
			return { error: 'Card not found' }
		}

		const lastCard = await prisma.card.findFirst({
			where: { listId: cardToCopy.listId },
			orderBy: { order: 'desc' },
			select: { order: true },
		})

		const newOrder = lastCard ? lastCard.order + 1 : 1

		card = await prisma.card.create({
			data: {
				title: `${cardToCopy.title} - Copy`,
				description: cardToCopy.description,
				order: newOrder,
				listId: cardToCopy.listId,
			},
		})

		await createAuditLog({
			action: ACTION.CREATE,
			entityId: card.id,
			entityType: ENTITY_TYPE.CARD,
			entityTitle: card.title,
		})
	} catch {
		return { error: 'Failed to copy' }
	}

	revalidatePath(`/board/${boardId}`)
	return { data: card }
}

export const copyCard = createSafeAction(CopyCard, handler)
