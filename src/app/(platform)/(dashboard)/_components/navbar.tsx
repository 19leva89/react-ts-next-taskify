'use client'

import { PlusIcon } from 'lucide-react'
import { OrganizationSwitcher, UserButton } from '@clerk/nextjs'

import { Button } from '@/components/ui'
import { Logo } from '@/components/shared/logo'
import { FormPopover } from '@/components/shared/form/form-popover'
import { MobileSidebar } from '@/app/(platform)/(dashboard)/_components/mobile-sidebar'

export const Navbar = () => {
	return (
		<nav className="fixed top-0 z-50 px-4 w-full h-14 border-b shadow-sm bg-white flex items-center">
			<MobileSidebar />

			<div className="flex items-center gap-x-4">
				<div className="hidden md:flex">
					<Logo />
				</div>

				<FormPopover align="start" side="bottom" sideOffset={18}>
					<Button
						variant="primary"
						size="sm"
						className="rounded-sm hidden md:block h-auto py-1.5 px-2 transition-colors ease-in-out duration-300"
					>
						Create
					</Button>
				</FormPopover>

				<FormPopover>
					<Button
						variant="primary"
						size="sm"
						className="rounded-sm block md:hidden transition-colors ease-in-out duration-300"
					>
						<PlusIcon className="size-4" />
					</Button>
				</FormPopover>
			</div>

			<div className="ml-auto flex items-center gap-x-2">
				<OrganizationSwitcher
					hidePersonal
					afterCreateOrganizationUrl="/organization/:id"
					afterLeaveOrganizationUrl="/select-org"
					afterSelectOrganizationUrl="/organization/:id"
					appearance={{
						elements: {
							rootBox: {
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
							},
						},
					}}
				/>

				<UserButton
					appearance={{
						elements: {
							avatarBox: {
								height: 30,
								width: 30,
							},
						},
					}}
				/>
			</div>
		</nav>
	)
}
