'use server'

import { auth } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'

import { prisma } from '@/lib/prisma'
import { createAuditLog } from '@/lib/create-audit-log'
import { ACTION, ENTITY_TYPE } from '@/lib/prisma-enums'
import { DeleteCard } from '@/actions/delete-card/schema'
import { createSafeAction } from '@/lib/create-safe-action'
import { InputType, ReturnType } from '@/actions/delete-card/types'

const handler = async (data: InputType): Promise<ReturnType> => {
	const { userId, orgId } = await auth()

	if (!userId || !orgId) {
		return { error: 'Unauthorized' }
	}

	const { id, boardId } = data

	let card

	try {
		card = await prisma.card.delete({ where: { id, list: { board: { orgId } } } })

		await createAuditLog({
			action: ACTION.DELETE,
			entityId: card.id,
			entityType: ENTITY_TYPE.CARD,
			entityTitle: card.title,
		})
	} catch {
		return { error: 'Failed to delete' }
	}

	revalidatePath(`/board/${boardId}`)
	return { data: card }
}

export const deleteCard = createSafeAction(DeleteCard, handler)
