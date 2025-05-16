import { Suspense } from 'react'

import { Separator } from '@/components/ui'
import { checkSubscription } from '@/lib/subscription'
import { Info } from '@/app/(platform)/(dashboard)/organization/[organizationId]/_components/info'
import { ActivityList } from '@/app/(platform)/(dashboard)/organization/[organizationId]/activity/_components/activity-list'

const ActivityPage = async () => {
	const isPro = await checkSubscription()

	return (
		<div className="w-full">
			<Info isPro={isPro} />

			<Separator className="my-4" />

			<Suspense fallback={<ActivityList.Skeleton />}>
				<ActivityList />
			</Suspense>
		</div>
	)
}

export default ActivityPage
