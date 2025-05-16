'use server'

import { auth } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'

import { prisma } from '@/lib/db'
import { createSafeAction } from '@/lib/create-safe-action'
import { UpdateListOrder } from '@/actions/update-list-order/schema'
import { InputType, ReturnType } from '@/actions/update-list-order/types'

const handler = async (data: InputType): Promise<ReturnType> => {
	const { userId, orgId } = await auth()

	if (!userId || !orgId) {
		return { error: 'Unauthorized' }
	}

	const { items, boardId } = data

	let lists

	try {
		const transaction = items.map((list) =>
			prisma.list.update({ where: { id: list.id, board: { orgId } }, data: { order: list.order } }),
		)

		lists = await prisma.$transaction(transaction)
	} catch (error) {
		return { error: 'Failed to reorder' }
	}

	revalidatePath(`/board/${boardId}`)
	return { data: lists }
}

export const updateListOrder = createSafeAction(UpdateListOrder, handler)
