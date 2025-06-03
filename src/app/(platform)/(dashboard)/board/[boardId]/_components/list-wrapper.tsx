import { PropsWithChildren } from 'react'

export const ListWrapper = ({ children }: PropsWithChildren) => {
	return <li className='h-full w-68 shrink-0 select-none'>{children}</li>
}
