'use server'

import { auth } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'

import { prisma } from '@/lib/prisma'
import { createAuditLog } from '@/lib/create-audit-log'
import { ACTION, ENTITY_TYPE } from '@/lib/prisma-enums'
import { DeleteList } from '@/actions/delete-list/schema'
import { createSafeAction } from '@/lib/create-safe-action'
import { InputType, ReturnType } from '@/actions/delete-list/types'

const handler = async (data: InputType): Promise<ReturnType> => {
	const { userId, orgId } = await auth()

	if (!userId || !orgId) {
		return { error: 'Unauthorized' }
	}

	const { id, boardId } = data

	let list

	try {
		list = await prisma.list.delete({ where: { id, boardId, board: { orgId } } })

		await createAuditLog({
			action: ACTION.DELETE,
			entityId: list.id,
			entityType: ENTITY_TYPE.LIST,
			entityTitle: list.title,
		})
	} catch {
		return { error: 'Failed to delete' }
	}

	revalidatePath(`/board/${boardId}`)
	return { data: list }
}

export const deleteList = createSafeAction(DeleteList, handler)
