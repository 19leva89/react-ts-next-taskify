'use server'

import { auth } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'

import { prisma } from '@/lib/db'
import { createSafeAction } from '@/lib/create-safe-action'

import { DeleteCard } from './schema'
import { InputType, ReturnType } from './types'

const handler = async (data: InputType): Promise<ReturnType> => {
	const { userId, orgId } = auth()

	if (!userId || !orgId) {
		return {
			error: 'Unauthorized',
		}
	}

	const { id, boardId } = data

	let card

	try {
		card = await prisma.card.delete({
			where: {
				id,
				list: {
					board: {
						orgId,
					},
				},
			},
		})
	} catch (error) {
		return {
			error: 'Failed to delete',
		}
	}

	revalidatePath(`/board/${boardId}`)
	return { data: card }
}

export const deleteCard = createSafeAction(DeleteCard, handler)