import { z } from 'zod'

export const UpdateCard = z.object({
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
		.max(20, {
			message: 'Title is too long, maximum 20 letters',
		}),
	description: z.optional(
		z
			.string({
				required_error: 'Description is required',
				invalid_type_error: 'Description is required',
			})
			.min(3, {
				message: 'Description is too short',
			})
			.max(255, {
				message: 'Description is too long, maximum 255 letters',
			}),
	),
})