import type { Metadata } from 'next'
import { PropsWithChildren } from 'react'
import { Analytics } from '@vercel/analytics/next'

import { textFont } from '@/app/fonts'
import { siteConfig } from '@/config/site'

import '@/app/globals.css'

export const metadata: Metadata = {
	title: { default: siteConfig.name, template: `%s | ${siteConfig.name}` },
	description: siteConfig.description,
	icons: [{ url: '/svg/icon.svg', href: '/svg/icon.svg' }],
}

export default function RootLayout({ children }: PropsWithChildren) {
	return (
		<html lang='en'>
			<body className={textFont.className}>
				{children}

				{/* Allow track page views for Vercel */}
				<Analytics />
			</body>
		</html>
	)
}
