import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

import { prisma } from '@/lib/db'
interface BoardIdPageProps {
	params: {
		boardId: string
	}
}

const BoardIdPage = async ({ params }: BoardIdPageProps) => {
	const { orgId } = auth()

	if (!orgId) {
		return redirect('/select-org')
	}

	const lists = await prisma.list.findMany({
		where: {
			boardId: params.boardId,
			board: {
				orgId,
			},
		},
		include: {
			cards: {
				orderBy: {
					order: 'asc',
				},
			},
		},
		orderBy: {
			order: 'asc',
		},
	})

	return <div>BoardIdPage</div>
}

export default BoardIdPage
