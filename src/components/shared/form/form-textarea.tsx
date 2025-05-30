'use client'

import { useFormStatus } from 'react-dom'
import { forwardRef, KeyboardEventHandler } from 'react'

import { cn } from '@/lib'
import { Label, Textarea } from '@/components/ui'
import { FormErrors } from '@/components/shared/form/form-errors'

interface Props {
	id: string
	label?: string
	placeholder?: string
	required?: boolean
	disabled?: boolean
	errors?: Record<string, string[] | undefined>
	className?: string
	defaultValue?: string
	onKeyDown?: KeyboardEventHandler<HTMLTextAreaElement> | undefined
	onBlur?: () => void
	onClick?: () => void
}

export const FormTextarea = forwardRef<HTMLTextAreaElement, Props>(
	(
		{
			id,
			label,
			placeholder,
			required,
			disabled,
			errors,
			className,
			defaultValue = '',
			onKeyDown,
			onBlur,
			onClick,
		},
		ref,
	) => {
		const { pending } = useFormStatus()

		return (
			<div className="space-y-2 w-full">
				<div className="space-y-1 w-full">
					{label ? (
						<Label htmlFor={id} className="text-xs font-semibold text-neutral-700">
							{label}
						</Label>
					) : null}

					<Textarea
						id={id}
						name={id}
						placeholder={placeholder}
						required={required}
						disabled={pending || disabled}
						className={cn(
							'resize-none focus-visible:ring-0 focus-visible:ring-offset-0 ring-0 focus:ring-0 outline-none shadow-sm',
							className,
						)}
						defaultValue={defaultValue}
						onKeyDown={onKeyDown}
						onBlur={onBlur}
						onClick={onClick}
						ref={ref}
						aria-describedby={`${id}-error`}
					/>
				</div>

				<FormErrors id={id} errors={errors} />
			</div>
		)
	},
)

FormTextarea.displayName = 'FormTextarea'
