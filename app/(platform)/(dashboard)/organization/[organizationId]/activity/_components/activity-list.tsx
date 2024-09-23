import { redirect } from 'next/navigation'
import { auth } from '@clerk/nextjs/server'

import { prisma } from '@/lib/db'
import { Skeleton } from '@/components/ui/skeleton'
import { ActivityItem } from '@/components/activity-item'

export const ActivityList = async () => {
	const { orgId } = auth()

	if (!orgId) {
		return redirect('/select-org')
	}

	const auditLogs = await prisma.auditLog.findMany({
		where: {
			orgId,
		},
		orderBy: {
			createdAt: 'desc',
		},
	})

	return (
		<ol className="space-y-4 mt-4">
			<p className="hidden last:block text-xs text-center text-muted-foreground">
				No activity found inside this organization
			</p>

			{auditLogs.map((log) => (
				<ActivityItem key={log.id} data={log} />
			))}
		</ol>
	)
}

ActivityList.Skeleton = function SkeletonActivityList() {
	return (
		<ol className="space-y-4 mt-4">
			<Skeleton className="w-[80%] h-14" />
			<Skeleton className="w-[50%] h-14" />
			<Skeleton className="w-[70%] h-14" />
			<Skeleton className="w-[80%] h-14" />
			<Skeleton className="w-[80%] h-14" />
			<Skeleton className="w-[75%] h-14" />
			<Skeleton className="w-[60%] h-14" />
			<Skeleton className="w-[80%] h-14" />
		</ol>
	)
}
