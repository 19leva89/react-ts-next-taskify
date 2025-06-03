import { ReactNode } from 'react'

import { Footer } from '@/app/(marketing)/_components/footer'
import { Navbar } from '@/app/(marketing)/_components/navbar'

const MarketingLayout = ({ children }: { children: ReactNode }) => {
	return (
		<div className='h-full bg-slate-100'>
			<Navbar />

			<main className='bg-slate-100 pt-40 pb-20'>{children}</main>

			<Footer />
		</div>
	)
}

export default MarketingLayout
