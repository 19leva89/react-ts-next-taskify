'use client'

import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { ActivityIcon, CreditCardIcon, LayoutIcon, SettingsIcon } from 'lucide-react'

import { cn } from '@/lib'
import { AccordionContent, AccordionItem, AccordionTrigger, Button, Skeleton } from '@/components/ui'

export type Organization = {
	id: string
	slug: string
	imageUrl: string
	name: string
}

interface Props {
	isActive: boolean
	isExpanded: boolean
	organization: Organization
	onExpand: (id: string) => void
}

export const NavItem = ({ isActive, isExpanded, organization, onExpand }: Props) => {
	const router = useRouter()
	const pathname = usePathname()

	const routes = [
		{
			label: 'Boards',
			icon: <LayoutIcon className='mr-2 size-4' />,
			href: `/organization/${organization.id}`,
		},
		{
			label: 'Activity',
			icon: <ActivityIcon className='mr-2 size-4' />,
			href: `/organization/${organization.id}/activity`,
		},
		{
			label: 'Settings',
			icon: <SettingsIcon className='mr-2 size-4' />,
			href: `/organization/${organization.id}/settings`,
		},
		{
			label: 'Billing',
			icon: <CreditCardIcon className='mr-2 size-4' />,
			href: `/organization/${organization.id}/billing`,
		},
	]

	const onClick = (href: string) => {
		router.push(href)
	}

	return (
		<AccordionItem value={organization.id} className='border-none'>
			<AccordionTrigger
				onClick={() => onExpand(organization.id)}
				className={cn(
					'flex cursor-pointer items-center gap-x-2 rounded-md p-1.5 text-start text-neutral-700 no-underline transition hover:bg-neutral-500/10 hover:no-underline',
					isActive && !isExpanded && 'bg-sky-500/10 text-sky-700',
				)}
			>
				<div className='flex items-center gap-x-2'>
					<div className='relative size-7'>
						<Image
							fill
							src={organization.imageUrl}
							alt='Organization'
							className='rounded-sm object-cover'
							sizes='10vw'
						/>
					</div>

					<span className='text-sm font-medium'>{organization.name}</span>
				</div>
			</AccordionTrigger>

			<AccordionContent className='pt-1 text-neutral-700'>
				{routes.map((route) => (
					<Button
						key={route.href}
						variant='ghost'
						size='sm'
						onClick={() => onClick(route.href)}
						className={cn(
							'mb-1 w-full justify-start pl-10 font-normal transition-colors duration-300 ease-in-out',
							pathname === route.href && 'bg-sky-500/10 text-sky-700',
						)}
					>
						{route.icon}
						{route.label}
					</Button>
				))}
			</AccordionContent>
		</AccordionItem>
	)
}

NavItem.Skeleton = function SkeletonNavItem() {
	return (
		<div className='flex items-center gap-x-2'>
			<div className='relative size-10 shrink-0'>
				<Skeleton className='absolute size-full' />
			</div>

			<Skeleton className='h-10 w-full' />
		</div>
	)
}
