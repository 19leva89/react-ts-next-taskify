import Link from 'next/link'
import { MedalIcon } from 'lucide-react'

import { cn } from '@/lib'
import { Button } from '@/components/ui'
import { headingFont, textFont } from '@/app/fonts'

const MarketingPage = () => {
	return (
		<div className='flex flex-col items-center justify-center'>
			<div className={cn('flex flex-col items-center justify-center', headingFont.className)}>
				<div className='mb-4 flex items-center rounded-full border bg-amber-100 p-4 text-amber-700 uppercase shadow-sm'>
					<MedalIcon className='mr-2 size-6' />
					No 1 task management
				</div>

				<h1 className='mb-6 text-center text-3xl text-neutral-800 md:text-6xl'>Taskify helps team move</h1>

				<div className='w-fit rounded-md bg-gradient-to-r from-fuchsia-600 to-pink-600 p-2 px-4 pb-4 text-3xl text-white md:text-6xl'>
					work forward
				</div>
			</div>

			<div
				className={cn(
					'mx-auto mt-4 max-w-xs text-center text-sm text-neutral-400 md:max-w-2xl md:text-xl',
					textFont.className,
				)}
			>
				Collaborate, manage projects, and reach new productivity peaks. From high rises to the home office,
				the way your team works is unique - accomplish it all with Taskify
			</div>

			<Button className='mt-6 transition-colors duration-300 ease-in-out' size='lg' asChild>
				<Link href='/sign-up'>Get Taskify for free</Link>
			</Button>
		</div>
	)
}

export default MarketingPage
