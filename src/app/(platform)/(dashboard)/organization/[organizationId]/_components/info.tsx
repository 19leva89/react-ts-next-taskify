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
		<div className='flex items-center gap-x-4'>
			{organization?.imageUrl && (
				<div className='relative size-15'>
					<Image
						fill
						src={organization.imageUrl}
						alt='Organization'
						className='rounded-md object-cover'
						sizes='20vw'
					/>
				</div>
			)}

			<div className='space-y-1'>
				<p className='text-xl font-semibold'> {organization?.name}</p>

				<div className='flex items-center text-xs text-muted-foreground'>
					<CreditCardIcon className='mr-1 size-3' />

					{isPro ? 'Pro' : 'Free'}
				</div>
			</div>
		</div>
	)
}

Info.Skeleton = function SkeletonInfo() {
	return (
		<div className='flex items-center gap-x-4'>
			<div className='relative size-15'>
				<Skeleton className='absolute size-full' />
			</div>

			<div className='space-y-2'>
				<Skeleton className='h-10 w-50' />

				<div className='flex items-center'>
					<Skeleton className='mr-2 size-4' />
					<Skeleton className='h-4 w-25' />
				</div>
			</div>
		</div>
	)
}
