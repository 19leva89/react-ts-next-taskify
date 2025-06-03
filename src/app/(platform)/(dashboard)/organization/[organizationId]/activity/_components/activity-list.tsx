import { redirect } from 'next/navigation'
import { auth } from '@clerk/nextjs/server'

import { prisma } from '@/lib/db'
import { Skeleton } from '@/components/ui'
import { ActivityItem } from '@/components/shared/activity-item'

export const ActivityList = async () => {
	const { orgId } = await auth()

	if (!orgId) {
		return redirect('/select-org')
	}

	const auditLogs = await prisma.auditLog.findMany({ where: { orgId }, orderBy: { createdAt: 'desc' } })

	return (
		<ol className='mt-4 space-y-4'>
			<p className='hidden text-center text-xs text-muted-foreground last:block'>
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
		<ol className='mt-4 space-y-4'>
			<Skeleton className='h-14 w-[80%]' />
			<Skeleton className='h-14 w-[50%]' />
			<Skeleton className='h-14 w-[70%]' />
			<Skeleton className='h-14 w-[80%]' />
			<Skeleton className='h-14 w-[80%]' />
			<Skeleton className='h-14 w-[75%]' />
			<Skeleton className='h-14 w-[60%]' />
			<Skeleton className='h-14 w-[80%]' />
		</ol>
	)
}
