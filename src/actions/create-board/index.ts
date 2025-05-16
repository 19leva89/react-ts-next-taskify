'use server'

import { auth } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'
import { ACTION, ENTITY_TYPE } from '@prisma/client'

import { prisma } from '@/lib/db'
import { checkSubscription } from '@/lib/subscription'
import { createAuditLog } from '@/lib/create-audit-log'
import { CreateBoard } from '@/actions/create-board/schema'
import { createSafeAction } from '@/lib/create-safe-action'
import { InputType, ReturnType } from '@/actions/create-board/types'
import { hasAvailableCount, incrementAvailableCount } from '@/lib/org-limit'

const handler = async (data: InputType): Promise<ReturnType> => {
	const { userId, orgId } = await auth()

	if (!userId || !orgId) {
		return { error: 'Unauthorized' }
	}

	const canCreate = await hasAvailableCount()
	const isPro = await checkSubscription()

	if (!canCreate && !isPro) {
		return { error: 'You have reached your limit of free boards. Please upgrade to create more.' }
	}

	const { title, image } = data
	const [imageId, imageThumbUrl, imageFullUrl, imageLinkHtml, imageUserName] = image.split('|')
	// console.log({ imageId, imageThumbUrl, imageFullUrl, imageLinkHtml, imageUserName })

	if (!imageId || !imageThumbUrl || !imageFullUrl || !imageLinkHtml || !imageUserName) {
		return { error: 'Missing fields. Failed to create board.' }
	}

	let board

	try {
		board = await prisma.board.create({
			data: { title, orgId, imageId, imageThumbUrl, imageFullUrl, imageLinkHtml, imageUserName },
		})

		await incrementAvailableCount()

		await createAuditLog({
			action: ACTION.CREATE,
			entityId: board.id,
			entityType: ENTITY_TYPE.BOARD,
			entityTitle: board.title,
		})
	} catch (error) {
		return { error: 'Failed to create' }
	}

	revalidatePath(`/board/${board.id}`)
	return { data: board }
}

export const createBoard = createSafeAction(CreateBoard, handler)
