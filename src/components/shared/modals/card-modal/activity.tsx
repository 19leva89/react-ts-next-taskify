'use client'

import { AuditLog } from '@prisma/client'
import { ActivityIcon } from 'lucide-react'

import { Skeleton } from '@/components/ui'
import { ActivityItem } from '@/components/shared/activity-item'

interface Props {
	data: AuditLog[]
}

export const Activity = ({ data }: Props) => {
	return (
		<div className="flex items-center gap-x-3 w-full">
			<ActivityIcon className="size-5 mt-0.5 text-neutral-700" />

			<div className="w-full">
				<p className="font-semibold text-neutral-700 mb-2">Activity</p>

				<ol className="mt-2 space-y-4">
					{data.map((item) => (
						<ActivityItem key={item.id} data={item} />
					))}
				</ol>
			</div>
		</div>
	)
}

Activity.Skeleton = function SkeletonActivity() {
	return (
		<div className="flex items-start gap-x-3 w-full">
			<Skeleton className="size-6 bg-neutral-200" />

			<div className="w-full">
				<Skeleton className="h-6 w-24 mb-2 bg-neutral-200" />
				<Skeleton className="h-10 w-full bg-neutral-200" />
			</div>
		</div>
	)
}
