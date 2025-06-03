'use client'

import { toast } from 'sonner'

import { Button } from '@/components/ui'
import { useAction } from '@/hooks/use-action'
import { useProModal } from '@/hooks/use-pro-modal'
import { stripeRedirect } from '@/actions/stripe-redirect'

interface Props {
	isPro: boolean
}

export const SubscriptionButton = ({ isPro }: Props) => {
	const proModal = useProModal()

	const { execute, isLoading } = useAction(stripeRedirect, {
		onSuccess: (data) => {
			window.location.href = data
		},

		onError: (error) => {
			toast.error(error)
		},
	})

	const onClick = () => {
		if (isPro) {
			execute({})
		} else {
			proModal.onOpen()
		}
	}

	return (
		<Button
			variant='primary'
			onClick={onClick}
			disabled={isLoading}
			className='transition-colors duration-300 ease-in-out'
		>
			{isPro ? 'Manage subscription' : 'Upgrade to Pro'}
		</Button>
	)
}
