import { PropsWithChildren } from 'react'

export const ListWrapper = ({ children }: PropsWithChildren) => {
	return <li className="shrink-0 h-full w-68 select-none">{children}</li>
}
