import { z } from 'zod'

export const CreateCard = z.object({
	boardId: z.string(),
	listId: z.string(),
	title: z
		.string({
			error: 'Title is required',
		})
		.min(3, {
			error: 'Title is too short',
		})
		.max(200, {
			error: 'Title is too long, maximum 200 letters',
		}),
})
