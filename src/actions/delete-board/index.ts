'use server'

import { redirect } from 'next/navigation'
import { auth } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'
import { ACTION, ENTITY_TYPE } from '@prisma/client'

import { prisma } from '@/lib/db'
import { createAuditLog } from '@/lib/create-audit-log'
import { decreaseAvailableCount } from '@/lib/org-limit'
import { DeleteBoard } from '@/actions/delete-board/schema'
import { createSafeAction } from '@/lib/create-safe-action'
import { InputType, ReturnType } from '@/actions/delete-board/types'

const handler = async (data: InputType): Promise<ReturnType> => {
	const { userId, orgId } = await auth()

	if (!userId || !orgId) {
		return { error: 'Unauthorized' }
	}

	const { id } = data

	let board

	try {
		board = await prisma.board.delete({ where: { id, orgId } })

		await decreaseAvailableCount()

		await createAuditLog({
			action: ACTION.DELETE,
			entityId: board.id,
			entityType: ENTITY_TYPE.BOARD,
			entityTitle: board.title,
		})
	} catch {
		return { error: 'Failed to delete' }
	}

	revalidatePath(`/organization/${orgId}`)
	redirect(`/organization/${orgId}`)
}

export const deleteBoard = createSafeAction(DeleteBoard, handler)
