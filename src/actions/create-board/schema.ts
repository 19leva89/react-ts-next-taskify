import { z } from 'zod'

export const CreateBoard = z.object({
	title: z
		.string({
			error: 'Title is required',
		})
		.min(3, {
			error: 'Title is too short',
		})
		.max(25, {
			error: 'Title is too long, maximum 25 letters',
		}),
	image: z.string({
		error: 'Image is required',
	}),
})
