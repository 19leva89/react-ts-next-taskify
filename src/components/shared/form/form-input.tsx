'use client'

import { forwardRef } from 'react'
import { useFormStatus } from 'react-dom'

import { cn } from '@/lib'
import { Input, Label } from '@/components/ui'
import { FormErrors } from '@/components/shared/form/form-errors'

interface Props {
	id: string
	label?: string
	type?: string
	placeholder?: string
	required?: boolean
	disabled?: boolean
	errors?: Record<string, string[] | undefined>
	className?: string
	defaultValue?: string
	onBlur?: () => void
}

export const FormInput = forwardRef<HTMLInputElement, Props>(
	(
		{ id, label, type, placeholder, required, disabled, errors, className, defaultValue = '', onBlur },
		ref,
	) => {
		const { pending } = useFormStatus()

		return (
			<div className='space-y-2'>
				<div className='space-y-1'>
					{label ? (
						<Label htmlFor={id} className='text-xs font-semibold text-neutral-700'>
							{label}
						</Label>
					) : null}

					<Input
						id={id}
						name={id}
						type={type}
						placeholder={placeholder}
						required={required}
						disabled={pending || disabled}
						className={cn('h-7 px-2 py-1 text-sm', className)}
						defaultValue={defaultValue}
						onBlur={onBlur}
						ref={ref}
						aria-describedby={`${id}-error`}
					/>
				</div>

				<FormErrors id={id} errors={errors} />
			</div>
		)
	},
)

FormInput.displayName = 'FormInput'
