import { redirect } from 'next/navigation'
import { auth } from '@clerk/nextjs/server'

import { prisma } from '@/lib/prisma'
import { ListContainer } from '@/app/(platform)/(dashboard)/board/[boardId]/_components/list-container'

interface Props {
	params: Promise<{ boardId: string }>
}

const BoardIdPage = async ({ params }: Props) => {
	const { orgId } = await auth()

	if (!orgId) {
		return redirect('/select-org')
	}

	const lists = await prisma.list.findMany({
		where: { boardId: (await params).boardId, board: { orgId } },
		include: { cards: { orderBy: { order: 'asc' } } },
		orderBy: { order: 'asc' },
	})

	return (
		<div className='h-full overflow-x-auto p-4'>
			<ListContainer boardId={(await params).boardId} data={lists} />
		</div>
	)
}

export default BoardIdPage
