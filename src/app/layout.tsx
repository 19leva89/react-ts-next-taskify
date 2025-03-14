import type { Metadata } from 'next'

import { textFont } from './fonts'
import { siteConfig } from '@/config/site'

import './globals.css'
import { PropsWithChildren } from 'react'

export const metadata: Metadata = {
	title: { default: siteConfig.name, template: `%s | ${siteConfig.name}` },
	description: siteConfig.description,
	icons: [{ url: '/svg/icon.svg', href: '/svg/icon.svg' }],
}

export default function RootLayout({ children }: PropsWithChildren) {
	return (
		<html lang="en">
			<body className={textFont.className}>{children}</body>
		</html>
	)
}
