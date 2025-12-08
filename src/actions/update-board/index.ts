'use server'

import { auth } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'

import { prisma } from '@/lib/prisma'
import { createAuditLog } from '@/lib/create-audit-log'
import { ACTION, ENTITY_TYPE } from '@/lib/prisma-enums'
import { UpdateBoard } from '@/actions/update-board/schema'
import { createSafeAction } from '@/lib/create-safe-action'
import { InputType, ReturnType } from '@/actions/update-board/types'

const handler = async (data: InputType): Promise<ReturnType> => {
	const { userId, orgId } = await auth()

	if (!userId || !orgId) {
		return { error: 'Unauthorized' }
	}

	const { title, id } = data

	let board

	try {
		board = await prisma.board.update({ where: { id, orgId }, data: { title } })

		await createAuditLog({
			action: ACTION.UPDATE,
			entityId: board.id,
			entityType: ENTITY_TYPE.BOARD,
			entityTitle: board.title,
		})
	} catch {
		return { error: 'Failed to update' }
	}

	revalidatePath(`/board/${id}`)
	return { data: board }
}

export const updateBoard = createSafeAction(UpdateBoard, handler)
