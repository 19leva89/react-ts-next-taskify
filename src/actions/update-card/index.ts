'use server'

import { auth } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'
import { ACTION, ENTITY_TYPE } from '@prisma/client'

import { prisma } from '@/lib/db'
import { createAuditLog } from '@/lib/create-audit-log'
import { UpdateCard } from '@/actions/update-card/schema'
import { createSafeAction } from '@/lib/create-safe-action'
import { InputType, ReturnType } from '@/actions/update-card/types'

const handler = async (data: InputType): Promise<ReturnType> => {
	const { userId, orgId } = await auth()

	if (!userId || !orgId) {
		return { error: 'Unauthorized' }
	}

	const { id, boardId, ...values } = data

	let card

	try {
		card = await prisma.card.update({ where: { id, list: { board: { orgId } } }, data: { ...values } })

		await createAuditLog({
			action: ACTION.UPDATE,
			entityId: card.id,
			entityType: ENTITY_TYPE.CARD,
			entityTitle: card.title,
		})
	} catch {
		return { error: 'Failed to update' }
	}

	revalidatePath(`/board/${boardId}`)
	return { data: card }
}

export const updateCard = createSafeAction(UpdateCard, handler)
