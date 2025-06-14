'use client'

import Image from 'next/image'
import { toast } from 'sonner'

import { useAction } from '@/hooks/use-action'
import { useProModal } from '@/hooks/use-pro-modal'
import { stripeRedirect } from '@/actions/stripe-redirect'
import { Button, Dialog, DialogContent, DialogTitle } from '@/components/ui'

export const ProModal = () => {
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
		execute({})
	}

	return (
		<Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
			<DialogContent className='max-w-md overflow-hidden bg-white p-0' aria-describedby={undefined}>
				<div className='relative flex aspect-video items-center justify-center'>
					<Image src='/svg/hero.svg' alt='hero' className='object-cover' fill />
				</div>

				<div className='mx-auto space-y-6 p-6 text-neutral-700'>
					<DialogTitle className='text-xl font-semibold'>Upgrade to Taskify Pro Today!</DialogTitle>

					<p className='text-xs font-semibold text-neutral-600'>Explore the best of Taskify</p>

					<div className='pl-3'>
						<ul className='list-disc text-sm'>
							<li>Unlimited boards</li>
							<li>Advanced checklists</li>
							<li>Admin and security features</li>
							<li>And more!</li>
						</ul>
					</div>

					<Button
						variant='primary'
						onClick={onClick}
						disabled={isLoading}
						className='w-full transition-colors duration-300 ease-in-out'
					>
						Upgrade
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	)
}
