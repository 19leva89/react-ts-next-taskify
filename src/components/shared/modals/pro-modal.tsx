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
			<DialogContent className="max-w-md p-0 overflow-hidden bg-white" aria-describedby={undefined}>
				<div className="aspect-video relative flex items-center justify-center">
					<Image src="/svg/hero.svg" alt="hero" className="object-cover" fill />
				</div>

				<div className="text-neutral-700 mx-auto space-y-6 p-6">
					<DialogTitle className="font-semibold text-xl">Upgrade to Taskify Pro Today!</DialogTitle>

					<p className="text-xs font-semibold text-neutral-600">Explore the best of Taskify</p>

					<div className="pl-3">
						<ul className="text-sm list-disc">
							<li>Unlimited boards</li>
							<li>Advanced checklists</li>
							<li>Admin and security features</li>
							<li>And more!</li>
						</ul>
					</div>

					<Button
						variant="primary"
						onClick={onClick}
						disabled={isLoading}
						className="w-full transition-colors ease-in-out duration-300"
					>
						Upgrade
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	)
}
