'use server'

import { auth } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'

import { prisma } from '@/lib/db'
import { createSafeAction } from '@/lib/create-safe-action'

import { CreateBoard } from './schema'
import { InputType, ReturnType } from './types'

const handler = async (data: InputType): Promise<ReturnType> => {
	const { userId, orgId } = auth()

	if (!userId || !orgId) {
		return {
			error: 'Unauthorized',
		}
	}

	const { title, image } = data
	const [imageId, imageThumbUrl, imageFullUrl, imageLinkHtml, imageUserName] = image.split('|')
	// console.log({ imageId, imageThumbUrl, imageFullUrl, imageLinkHtml, imageUserName })

	if (!imageId || !imageThumbUrl || !imageFullUrl || !imageLinkHtml || !imageUserName) {
		return {
			error: 'Missing fields. Failed to create board.',
		}
	}

	let board

	try {
		board = await prisma.board.create({
			data: {
				title,
				orgId,
				imageId,
				imageThumbUrl,
				imageFullUrl,
				imageLinkHtml,
				imageUserName,
			},
		})
	} catch (error) {
		return {
			error: 'Failed to create',
		}
	}

	revalidatePath(`/board/${board.id}`)
	return { data: board }
}

export const createBoard = createSafeAction(CreateBoard, handler)
