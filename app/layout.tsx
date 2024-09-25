import type { Metadata } from 'next'

import { textFont } from './fonts'
import { siteConfig } from '@/config/site'

import './globals.css'

export const metadata: Metadata = {
	title: {
		default: siteConfig.name,
		template: `%s | ${siteConfig.name}`,
	},
	description: siteConfig.description,
	icons: [
		{
			url: '/icon.svg',
			href: '/icon.svg',
		},
	],
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<body className={textFont.className}>{children}</body>
		</html>
	)
}
