'use client'

import { AuditLog } from '@prisma/client'

import { Skeleton } from '@/components/ui/skeleton'

interface ActivityProps {
	data: AuditLog[]
}

export const Activity = ({ data }: ActivityProps) => {
	return <div>activity</div>
}

Activity.Skeleton = function SkeletonActivity() {
	return (
		<div className="flex items-start gap-x-3 w-full">
			<Skeleton className="h-6 w-6 bg-neutral-200" />

			<div className="w-full">
				<Skeleton className="h-6 w-24 mb-2 bg-neutral-200" />
				<Skeleton className="h-10 w-full bg-neutral-200" />
			</div>
		</div>
	)
}
