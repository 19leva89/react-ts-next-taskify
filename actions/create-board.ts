'use server'

import { z } from 'zod'
import { prisma } from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export type State = {
	errors?: {
		title?: string[]
	}
	message?: string | null
}

const create = z.object({
	title: z
		.string()
		.min(3, {
			message: 'Minimum length of 3 letters is required',
		})
		.max(20, {
			message: 'Maximum length of 20 letters is required',
		}),
})

export const createBoard = async (prevState: State, formData: FormData) => {
	const validatedFields = create.safeParse({
		title: formData.get('title'),
	})

	if (!validatedFields.success) {
		return {
			errors: validatedFields.error?.flatten().fieldErrors,
			message: 'Missing fields.',
		}
	}

	const { title } = validatedFields.data

	try {
		await prisma.board.create({
			data: {
				title,
			},
		})
	} catch (error) {
		return {
			message: 'Database Error',
		}
	}

	revalidatePath('/organization/org_2mCJ3Ulu6FL0CdXZfF8gHmeZoVF')
	redirect('/organization/org_2mCJ3Ulu6FL0CdXZfF8gHmeZoVF')
}
