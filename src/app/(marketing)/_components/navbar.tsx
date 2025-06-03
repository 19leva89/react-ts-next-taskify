import Link from 'next/link'

import { Button } from '@/components/ui'
import { Logo } from '@/components/shared/logo'

export const Navbar = () => {
	return (
		<div className='fixed top-0 flex h-14 w-full items-center border-b bg-white px-4 shadow-sm'>
			<div className='mx-auto flex w-full items-center justify-between md:max-w-screen-2xl'>
				<Logo />

				<div className='flex w-full items-center justify-between space-x-4 md:block md:w-auto'>
					<Button size='sm' variant='outline' className='transition-colors duration-300 ease-in-out' asChild>
						<Link href='/sign-in'>Login</Link>
					</Button>

					<Button size='sm' className='transition-colors duration-300 ease-in-out' asChild>
						<Link href='/sign-up'>Get Taskify for free</Link>
					</Button>
				</div>
			</div>
		</div>
	)
}
