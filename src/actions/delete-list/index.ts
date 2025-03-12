'use server'

import { auth } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'
import { ACTION, ENTITY_TYPE } from '@prisma/client'

import { prisma } from '@/lib/db'
import { createAuditLog } from '@/lib/create-audit-log'
import { createSafeAction } from '@/lib/create-safe-action'

import { DeleteList } from './schema'
import { InputType, ReturnType } from './types'

const handler = async (data: InputType): Promise<ReturnType> => {
	const { userId, orgId } = auth()

	if (!userId || !orgId) {
		return {
			error: 'Unauthorized',
		}
	}

	const { id, boardId } = data

	let list

	try {
		list = await prisma.list.delete({
			where: {
				id,
				boardId,
				board: {
					orgId,
				},
			},
		})

		await createAuditLog({
			action: ACTION.DELETE,
			entityId: list.id,
			entityType: ENTITY_TYPE.LIST,
			entityTitle: list.title,
		})
	} catch (error) {
		return {
			error: 'Failed to delete',
		}
	}

	revalidatePath(`/board/${boardId}`)
	return { data: list }
}

export const deleteList = createSafeAction(DeleteList, handler)
