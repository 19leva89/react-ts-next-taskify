import { Board } from '@prisma/client'

import { BoardOptions } from '@/app/(platform)/(dashboard)/board/[boardId]/_components/board-options'
import { BoardTitleForm } from '@/app/(platform)/(dashboard)/board/[boardId]/_components/board-title-form'

interface Props {
	data: Board
}

export const BoardNavbar = async ({ data }: Props) => {
	return (
		<div className="z-40 w-full h-14 bg-black/50 fixed top-14 flex items-center px-6 gap-x-4 text-white">
			<BoardTitleForm data={data} />

			<div className="ml-auto">
				<BoardOptions id={data.id} />
			</div>
		</div>
	)
}
