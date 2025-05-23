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
			icon: <LayoutIcon className="size-4 mr-2" />,
			href: `/organization/${organization.id}`,
		},
		{
			label: 'Activity',
			icon: <ActivityIcon className="size-4 mr-2" />,
			href: `/organization/${organization.id}/activity`,
		},
		{
			label: 'Settings',
			icon: <SettingsIcon className="size-4 mr-2" />,
			href: `/organization/${organization.id}/settings`,
		},
		{
			label: 'Billing',
			icon: <CreditCardIcon className="size-4 mr-2" />,
			href: `/organization/${organization.id}/billing`,
		},
	]

	const onClick = (href: string) => {
		router.push(href)
	}

	return (
		<AccordionItem value={organization.id} className="border-none">
			<AccordionTrigger
				onClick={() => onExpand(organization.id)}
				className={cn(
					'flex items-center gap-x-2 p-1.5 rounded-md text-neutral-700 hover:bg-neutral-500/10 transition text-start no-underline hover:no-underline cursor-pointer',
					isActive && !isExpanded && 'bg-sky-500/10 text-sky-700',
				)}
			>
				<div className="flex items-center gap-x-2">
					<div className="size-7 relative">
						<Image
							fill
							src={organization.imageUrl}
							alt="Organization"
							className="rounded-sm object-cover"
							sizes="10vw"
						/>
					</div>

					<span className="font-medium text-sm">{organization.name}</span>
				</div>
			</AccordionTrigger>

			<AccordionContent className="pt-1 text-neutral-700">
				{routes.map((route) => (
					<Button
						key={route.href}
						variant="ghost"
						size="sm"
						onClick={() => onClick(route.href)}
						className={cn(
							'justify-start pl-10 mb-1 w-full font-normal transition-colors ease-in-out duration-300',
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
		<div className="flex items-center gap-x-2">
			<div className="size-10 relative shrink-0">
				<Skeleton className="size-full absolute" />
			</div>

			<Skeleton className="h-10 w-full" />
		</div>
	)
}
