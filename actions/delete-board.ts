'use server'

import { prisma } from '@/lib/db'
import { revalidatePath } from 'next/cache'

export const deleteBoard = async (id: string) => {
	await prisma.board.delete({
		where: {
			id,
		},
	})

	revalidatePath('/organization/org_2mCJ3Ulu6FL0CdXZfF8gHmeZoVF')
}
