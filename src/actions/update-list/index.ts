'use server'

import { auth } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'

import { prisma } from '@/lib/prisma'
import { createAuditLog } from '@/lib/create-audit-log'
import { ACTION, ENTITY_TYPE } from '@/lib/prisma-enums'
import { UpdateList } from '@/actions/update-list/schema'
import { createSafeAction } from '@/lib/create-safe-action'
import { InputType, ReturnType } from '@/actions/update-list/types'

const handler = async (data: InputType): Promise<ReturnType> => {
	const { userId, orgId } = await auth()

	if (!userId || !orgId) {
		return { error: 'Unauthorized' }
	}

	const { title, id, boardId } = data

	let list

	try {
		list = await prisma.list.update({ where: { id, boardId, board: { orgId } }, data: { title } })

		await createAuditLog({
			action: ACTION.UPDATE,
			entityId: list.id,
			entityType: ENTITY_TYPE.LIST,
			entityTitle: list.title,
		})
	} catch {
		return { error: 'Failed to update' }
	}

	revalidatePath(`/board/${boardId}`)
	return { data: list }
}

export const updateList = createSafeAction(UpdateList, handler)
