'use client'

import { ReactNode } from 'react'
import { useFormStatus } from 'react-dom'

import { cn } from '@/lib'
import { Button } from '@/components/ui'

interface Props {
	children: ReactNode
	disabled?: boolean
	className?: string
	variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' | 'primary'
}

export const FormSubmit = ({ children, disabled, className, variant = 'primary' }: Props) => {
	const { pending } = useFormStatus()

	return (
		<Button
			disabled={pending || disabled}
			type='submit'
			variant={variant}
			size='sm'
			className={cn(className)}
		>
			{children}
		</Button>
	)
}
