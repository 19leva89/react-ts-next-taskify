'use client'

import Link from 'next/link'
import { PlusIcon } from 'lucide-react'
import { useLocalStorage } from 'usehooks-ts'
import { useOrganization, useOrganizationList } from '@clerk/nextjs'

import { Accordion, Button, Skeleton } from '@/components/ui'
import { NavItem, Organization } from '@/app/(platform)/(dashboard)/_components/nav-item'

interface ExpandedState {
	[key: string]: boolean
}

interface Props {
	storageKey?: string
}

export const Sidebar = ({ storageKey = 't-sidebar-state' }: Props) => {
	const [expanded, setExpanded] = useLocalStorage<ExpandedState>(storageKey, {})

	const { organization: activeOrganization, isLoaded: isLoadedOrg } = useOrganization()

	const { userMemberships, isLoaded: isLoadedOrgList } = useOrganizationList({
		userMemberships: { infinite: true },
	})

	const defaultAccordionValue: string[] = Object.keys(expanded).reduce((acc: string[], key: string) => {
		if (expanded[key]) {
			acc.push(key)
		}

		return acc
	}, [])

	const onExpanded = (id: string) => {
		setExpanded((curr) => ({
			...curr,
			[id]: !expanded[id],
		}))
	}

	if (!isLoadedOrg || !isLoadedOrgList || userMemberships.isLoading) {
		return (
			<>
				<div className="flex items-center justify-between mb-2">
					<Skeleton className="h-10 w-[50%]" />

					<Skeleton className="size-10" />
				</div>

				<div className="space-y-2">
					<NavItem.Skeleton />
					<NavItem.Skeleton />
					<NavItem.Skeleton />
				</div>
			</>
		)
	}

	return (
		<>
			<div className="font-medium text-xs flex items-center mb-1">
				<span className="pl-4">Workspaces</span>

				<Button
					type="button"
					variant="ghost"
					size="icon"
					className="ml-auto transition-colors ease-in-out duration-300"
					asChild
				>
					<Link href="/select-org">
						<PlusIcon className="size-4" />
					</Link>
				</Button>
			</div>

			<Accordion type="multiple" defaultValue={defaultAccordionValue} className="space-y-2">
				{userMemberships.data.map(({ organization }) => (
					<NavItem
						key={organization.id}
						isActive={activeOrganization?.id === organization.id}
						isExpanded={expanded[organization.id]}
						organization={organization as Organization}
						onExpand={onExpanded}
					/>
				))}
			</Accordion>
		</>
	)
}
