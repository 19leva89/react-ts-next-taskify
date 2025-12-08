import { Board } from '@/generated/prisma/client'
import { BoardOptions } from '@/app/(platform)/(dashboard)/board/[boardId]/_components/board-options'
import { BoardTitleForm } from '@/app/(platform)/(dashboard)/board/[boardId]/_components/board-title-form'

interface Props {
	data: Board
}

export const BoardNavbar = async ({ data }: Props) => {
	return (
		<div className='fixed top-14 z-40 flex h-14 w-full items-center gap-x-4 bg-black/50 px-6 text-white'>
			<BoardTitleForm data={data} />

			<div className='ml-auto'>
				<BoardOptions id={data.id} />
			</div>
		</div>
	)
}
