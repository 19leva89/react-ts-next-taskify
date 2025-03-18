import { Button } from '@/components/ui'
import { Logo } from '@/components/shared/logo'

export const Footer = () => {
	return (
		<div className="fixed bottom-0 w-full p-4 border-t bg-slate-100">
			<div className="md:max-w-screen-2xl mx-auto flex items-center w-full justify-between">
				<Logo />

				<div className="space-x-4 md:block md:w-auto flex items-center justify-between w-full">
					<Button size="sm" variant="ghost" className="transition-colors ease-in-out duration-300">
						Privacy policy
					</Button>

					<Button size="sm" variant="ghost" className="transition-colors ease-in-out duration-300">
						Terms of service
					</Button>
				</div>
			</div>
		</div>
	)
}
