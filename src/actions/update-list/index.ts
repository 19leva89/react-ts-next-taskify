'use server'

import { auth } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'
import { ACTION, ENTITY_TYPE } from '@prisma/client'

import { prisma } from '@/lib/db'
import { createAuditLog } from '@/lib/create-audit-log'
import { createSafeAction } from '@/lib/create-safe-action'

import { UpdateList } from './schema'
import { InputType, ReturnType } from './types'

const handler = async (data: InputType): Promise<ReturnType> => {
	const { userId, orgId } = auth()

	if (!userId || !orgId) {
		return {
			error: 'Unauthorized',
		}
	}

	const { title, id, boardId } = data

	let list

	try {
		list = await prisma.list.update({
			where: {
				id,
				boardId,
				board: {
					orgId,
				},
			},
			data: { title },
		})

		await createAuditLog({
			action: ACTION.UPDATE,
			entityId: list.id,
			entityType: ENTITY_TYPE.LIST,
			entityTitle: list.title,
		})
	} catch (error) {
		return {
			error: 'Failed to update',
		}
	}

	revalidatePath(`/board/${boardId}`)
	return { data: list }
}

export const updateList = createSafeAction(UpdateList, handler)
