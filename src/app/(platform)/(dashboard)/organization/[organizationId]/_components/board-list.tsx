import Link from 'next/link'
import { redirect } from 'next/navigation'
import { auth } from '@clerk/nextjs/server'
import { HelpCircleIcon, User2Icon } from 'lucide-react'

import { prisma } from '@/lib/db'
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
		<div className="space-y-4">
			<div className="flex items-center font-semibold text-lg text-neutral-700">
				<User2Icon className="size-6 mr-2" />
				Your boards
			</div>

			<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
				{boards.map((board) => (
					<Link
						key={board.id}
						href={`/board/${board.id}`}
						className="group relative aspect-video bg-no-repeat bg-center bg-cover bg-sky-700 rounded-sm size-full p-2 overflow-hidden"
						style={{ backgroundImage: `url(${board.imageThumbUrl})` }}
					>
						<div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition" />

						<p className="relative font-semibold text-white">{board.title}</p>
					</Link>
				))}

				<FormPopover sideOffset={10} side="right">
					<div
						role="button"
						className="relative flex flex-col gap-y-1 items-center justify-center cursor-pointer aspect-video size-full bg-muted rounded-sm hover:opacity-75 transition"
					>
						<p className="text-sm">Create new board</p>

						<span className="text-xs">
							{isPro ? 'Unlimited' : `${MAX_FREE_BOARDS - availableCount} remaining`}
						</span>

						<Hint
							sideOffset={40}
							description="Free Workspaces can have up to 5 open boards. For unlimited boards upgrade this workspace."
						>
							<HelpCircleIcon className="absolute bottom-2 right-2 size-3.5" />
						</Hint>
					</div>
				</FormPopover>
			</div>
		</div>
	)
}

BoardList.Skeleton = function SkeletonBoardList() {
	return (
		<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
			<Skeleton className="aspect-video size-full p-2" />
			<Skeleton className="aspect-video size-full p-2" />
			<Skeleton className="aspect-video size-full p-2" />
			<Skeleton className="aspect-video size-full p-2" />
			<Skeleton className="aspect-video size-full p-2" />
			<Skeleton className="aspect-video size-full p-2" />
			<Skeleton className="aspect-video size-full p-2" />
			<Skeleton className="aspect-video size-full p-2" />
		</div>
	)
}
