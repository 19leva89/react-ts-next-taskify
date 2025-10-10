import { z } from 'zod'

export const UpdateCard = z.object({
	id: z.string(),
	boardId: z.string(),
	title: z.optional(
		z
			.string({
				error: 'Title is required',
			})
			.min(3, {
				error: 'Title is too short',
			})
			.max(200, {
				error: 'Title is too long, maximum 200 letters',
			}),
	),
	description: z.optional(
		z
			.string({
				error: 'Description is required',
			})
			.min(3, {
				error: 'Description is too short',
			})
			.max(500, {
				error: 'Description is too long, maximum 500 letters',
			}),
	),
})
