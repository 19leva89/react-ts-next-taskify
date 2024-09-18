import { prisma } from '@/lib/db'

import { Board } from './board'
import { Form } from './form'

const OrganizationIdPage = async () => {
	const boards = await prisma.board.findMany()

	return (
		<div className="flex flex-col space-y-4">
			<Form />

			<div>
				{boards.map((board) => (
					<Board key={board.id} id={board.id} title={board.title} />
				))}
			</div>
		</div>
	)
}

export default OrganizationIdPage
