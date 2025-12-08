import Link from 'next/link'
import { redirect } from 'next/navigation'
import { auth } from '@clerk/nextjs/server'
import { HelpCircleIcon, User2Icon } from 'lucide-react'

import { prisma } from '@/lib/prisma'
import { Skeleton } from '@/components/ui'
import { Hint } from '@/components/shared/hint'
import { getAvailableCount } from '@/lib/org-limit'
import { MAX_FREE_BOARDS } from '@/constants/boards'
import { checkSubscription } from '@/lib/subscription'
import { FormPopover } from '@/components/shared/form/form-popover'

export const BoardList = async () => {
	const { orgId } = await auth()

	if (!orgId) {
		return redirect('/select-org')
	}

	const boards = await prisma.board.findMany({ where: { orgId }, orderBy: { createdAt: 'desc' } })

	const availableCount = (await getAvailableCount()) ?? 0
	const isPro = await checkSubscription()

	return (
		<div className='space-y-4'>
			<div className='flex items-center text-lg font-semibold text-neutral-700'>
				<User2Icon className='mr-2 size-6' />
				Your boards
			</div>

			<div className='grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4'>
				{boards.map((board) => (
					<Link
						key={board.id}
						href={`/board/${board.id}`}
						className='group relative aspect-video size-full overflow-hidden rounded-sm bg-sky-700 bg-cover bg-center bg-no-repeat p-2'
						style={{ backgroundImage: `url(${board.imageThumbUrl})` }}
					>
						<div className='absolute inset-0 bg-black/30 transition group-hover:bg-black/40' />

						<p className='relative font-semibold text-white'>{board.title}</p>
					</Link>
				))}

				<FormPopover sideOffset={10} side='right'>
					<div
						role='button'
						className='relative flex aspect-video size-full cursor-pointer flex-col items-center justify-center gap-y-1 rounded-sm bg-muted transition hover:opacity-75'
					>
						<p className='text-sm'>Create new board</p>

						<span className='text-xs'>
							{isPro ? 'Unlimited' : `${MAX_FREE_BOARDS - availableCount} remaining`}
						</span>

						<Hint
							sideOffset={40}
							description='Free Workspaces can have up to 5 open boards. For unlimited boards upgrade this workspace.'
						>
							<HelpCircleIcon className='absolute right-2 bottom-2 size-3.5' />
						</Hint>
					</div>
				</FormPopover>
			</div>
		</div>
	)
}

BoardList.Skeleton = function SkeletonBoardList() {
	return (
		<div className='grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4'>
			<Skeleton className='aspect-video size-full p-2' />
			<Skeleton className='aspect-video size-full p-2' />
			<Skeleton className='aspect-video size-full p-2' />
			<Skeleton className='aspect-video size-full p-2' />
			<Skeleton className='aspect-video size-full p-2' />
			<Skeleton className='aspect-video size-full p-2' />
			<Skeleton className='aspect-video size-full p-2' />
			<Skeleton className='aspect-video size-full p-2' />
		</div>
	)
}
