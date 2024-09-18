import { deleteBoard } from '@/actions/delete-board'

import { FormSubmit } from '@/components/form/form-submit'

interface BoardProps {
	id: string
	title: string
}

export const Board = ({ id, title }: BoardProps) => {
	const deleteBoardWithId = deleteBoard.bind(null, id)

	return (
		<form className="flex items-center gap-x-2" action={deleteBoardWithId}>
			<p>Board title: {title}</p>

			<FormSubmit variant="destructive">Delete</FormSubmit>
		</form>
	)
}
