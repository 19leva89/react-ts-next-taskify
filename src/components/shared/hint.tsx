import { ReactNode } from 'react'

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui'

interface HintProps {
	children: ReactNode
	description: string
	side?: 'left' | 'right' | 'top' | 'bottom'
	sideOffset?: number
}

export const Hint = ({ children, description, side = 'bottom', sideOffset = 0 }: HintProps) => {
	return (
		<TooltipProvider>
			<Tooltip delayDuration={0}>
				<TooltipTrigger>{children}</TooltipTrigger>

				<TooltipContent side={side} sideOffset={sideOffset} className="text-xs max-w-55 break-words">
					{description}
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	)
}
