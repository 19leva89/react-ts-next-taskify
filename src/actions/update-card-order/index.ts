'use server'

import { auth } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'

import { prisma } from '@/lib/db'
import { createSafeAction } from '@/lib/create-safe-action'
import { UpdateCardOrder } from '@/actions/update-card-order/schema'
import { InputType, ReturnType } from '@/actions/update-card-order/types'

const handler = async (data: InputType): Promise<ReturnType> => {
	const { userId, orgId } = await auth()

	if (!userId || !orgId) {
		return { error: 'Unauthorized' }
	}

	const { items, boardId } = data

	let cards

	try {
		const transaction = items.map((card) =>
			prisma.card.update({
				where: { id: card.id, list: { board: { orgId } } },
				data: { order: card.order, listId: card.listId },
			}),
		)

		cards = await prisma.$transaction(transaction)
	} catch (error) {
		return { error: 'Failed to reorder' }
	}

	revalidatePath(`/board/${boardId}`)
	return { data: cards }
}

export const updateCardOrder = createSafeAction(UpdateCardOrder, handler)
