import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { Poppins } from 'next/font/google'

import { siteConfig } from '@/config/site'

import './globals.css'

export const headingFont = localFont({
	src: '../public/fonts/font.woff2',
})

export const textFont = Poppins({
	subsets: ['latin'],
	weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})

export const metadata: Metadata = {
	title: {
		default: siteConfig.name,
		template: `%s | ${siteConfig.name}`,
	},
	description: siteConfig.description,
	icons: [
		{
			url: '/icon.svg',
			href: 'icon.svg',
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
