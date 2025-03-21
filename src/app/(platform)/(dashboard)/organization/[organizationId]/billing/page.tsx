import { Separator } from '@/components/ui'
import { checkSubscription } from '@/lib/subscription'

import { Info } from '../_components/info'
import { SubscriptionButton } from './_components/subscription-button'

const BillingPage = async () => {
	const isPro = await checkSubscription()

	return (
		<div className="w-full">
			<Info isPro={isPro} />

			<Separator className="my-4" />

			<SubscriptionButton isPro={isPro} />
		</div>
	)
}

export default BillingPage
