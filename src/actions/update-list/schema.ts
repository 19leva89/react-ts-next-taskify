import { z } from 'zod'

export const UpdateList = z.object({
	id: z.string(),
	boardId: z.string(),
	title: z
		.string({
			required_error: 'Title is required',
			invalid_type_error: 'Title is required',
		})
		.min(3, {
			message: 'Title is too short',
		})
		.max(25, {
			message: 'Title is too long, maximum 25 letters',
		}),
})
