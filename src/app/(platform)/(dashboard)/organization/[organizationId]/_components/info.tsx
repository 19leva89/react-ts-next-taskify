'use client'

import Image from 'next/image'
import { CreditCardIcon } from 'lucide-react'
import { useOrganization } from '@clerk/nextjs'

import { Skeleton } from '@/components/ui'

interface Props {
	isPro: boolean
}

export const Info = ({ isPro }: Props) => {
	const { organization, isLoaded } = useOrganization()

	if (!isLoaded) {
		return <Info.Skeleton />
	}

	return (
		<div className="flex items-center gap-x-4">
			{organization?.imageUrl && (
				<div className="size-15 relative">
					<Image
						fill
						src={organization.imageUrl}
						alt="Organization"
						className="rounded-md object-cover"
						sizes="20vw"
					/>
				</div>
			)}

			<div className="space-y-1">
				<p className="font-semibold text-xl"> {organization?.name}</p>

				<div className="flex items-center text-xs text-muted-foreground">
					<CreditCardIcon className="size-3 mr-1" />

					{isPro ? 'Pro' : 'Free'}
				</div>
			</div>
		</div>
	)
}

Info.Skeleton = function SkeletonInfo() {
	return (
		<div className="flex items-center gap-x-4">
			<div className="size-15 relative">
				<Skeleton className="size-full absolute" />
			</div>

			<div className="space-y-2">
				<Skeleton className="h-10 w-50" />

				<div className="flex items-center">
					<Skeleton className="size-4 mr-2" />
					<Skeleton className="h-4 w-25" />
				</div>
			</div>
		</div>
	)
}
