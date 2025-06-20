import Link from 'next/link'
import Image from 'next/image'

export const Logo = () => {
	return (
		<Link href='/'>
			<div className='hidden items-center gap-x-2 transition hover:opacity-75 md:flex'>
				<Image
					src='/svg/logo.svg'
					alt='logo'
					height={30}
					width={100}
					style={{ width: 'auto', height: 'auto' }}
				/>
			</div>
		</Link>
	)
}
