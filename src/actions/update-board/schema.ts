import { z } from 'zod'

export const UpdateBoard = z.object({
	id: z.string(),
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
})
