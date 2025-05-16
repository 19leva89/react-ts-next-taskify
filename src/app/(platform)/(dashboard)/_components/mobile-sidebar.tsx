'use client'

import { MenuIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

import { useMobileSidebar } from '@/hooks/use-mobile-sidebar'
import { Button, Sheet, SheetContent } from '@/components/ui'
import { Sidebar } from '@/app/(platform)/(dashboard)/_components/sidebar'

export const MobileSidebar = () => {
	const pathname = usePathname()
	const [isMounted, setIsMounted] = useState(false)

	const onOpen = useMobileSidebar((state) => state.onOpen)
	const onClose = useMobileSidebar((state) => state.onClose)
	const isOpen = useMobileSidebar((state) => state.isOpen)

	useEffect(() => {
		setIsMounted(true)
	}, [])

	useEffect(() => {
		onClose()
	}, [pathname, onClose])

	if (!isMounted) {
		return null
	}

	return (
		<>
			<Button
				variant="ghost"
				size="sm"
				onClick={onOpen}
				className="block md:hidden mr-2 transition-colors ease-in-out duration-300"
			>
				<MenuIcon className="size-4" />
			</Button>

			<Sheet open={isOpen} onOpenChange={onClose}>
				<SheetContent side="left" className="p-2 pt-10 bg-white">
					<Sidebar storageKey="t-sidebar-mobile-state" />
				</SheetContent>
			</Sheet>
		</>
	)
}
