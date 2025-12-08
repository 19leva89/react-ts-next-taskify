import { PropsWithChildren } from 'react'
import { auth } from '@clerk/nextjs/server'
import { notFound, redirect } from 'next/navigation'

import { prisma } from '@/lib/prisma'
import { BoardNavbar } from '@/app/(platform)/(dashboard)/board/[boardId]/_components/board-navbar'

interface Props {
	params: Promise<{ boardId: string }>
}

export const generateMetadata = async ({ params }: Props) => {
	const { orgId } = await auth()

	if (!orgId) {
		return { title: 'Board' }
	}

	const board = await prisma.board.findUnique({ where: { id: (await params).boardId, orgId } })

	return { title: board?.title || 'Board' }
}

const BoardIdLayout = async ({ children, params }: PropsWithChildren<Props>) => {
	const { orgId } = await auth()

	if (!orgId) {
		redirect('/select-org')
	}

	const board = await prisma.board.findUnique({ where: { id: (await params).boardId, orgId } })

	if (!board) {
		notFound()
	}

	return (
		<div
			className='relative h-full bg-cover bg-center bg-no-repeat'
			style={{ backgroundImage: `url(${board.imageFullUrl})` }}
		>
			<BoardNavbar data={board} />

			<div className='absolute inset-0 bg-black/10' />

			<main className='relative h-full pt-28'>{children}</main>
		</div>
	)
}

export default BoardIdLayout
