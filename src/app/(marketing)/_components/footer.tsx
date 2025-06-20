import { Button } from '@/components/ui'
import { Logo } from '@/components/shared/logo'

export const Footer = () => {
	return (
		<div className='fixed bottom-0 w-full border-t bg-slate-100 p-4'>
			<div className='mx-auto flex w-full items-center justify-between md:max-w-screen-2xl'>
				<Logo />

				<div className='flex w-full items-center justify-between space-x-4 md:block md:w-auto'>
					<Button size='sm' variant='ghost' className='transition-colors duration-300 ease-in-out'>
						Privacy policy
					</Button>

					<Button size='sm' variant='ghost' className='transition-colors duration-300 ease-in-out'>
						Terms of service
					</Button>
				</div>
			</div>
		</div>
	)
}
