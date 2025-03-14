'use client'

import { toast } from 'sonner'
import { X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { ComponentRef, ReactNode, useRef } from 'react'

import { useAction } from '@/hooks/use-action'
import { useProModal } from '@/hooks/use-pro-modal'
import { createBoard } from '@/actions/create-board'

import { Button, Popover, PopoverContent, PopoverTrigger } from '@/components/ui'

import { FormInput } from './form-input'
import { FormSubmit } from './form-submit'
import { FormPicker } from './form-picker'

interface Props {
	children: ReactNode
	side?: 'left' | 'right' | 'top' | 'bottom'
	align?: 'start' | 'center' | 'end'
	sideOffset?: number
}

export const FormPopover = ({ children, side = 'bottom', align, sideOffset = 0 }: Props) => {
	const proModal = useProModal()
	const router = useRouter()
	const closeRef = useRef<ComponentRef<'button'>>(null)

	const { execute, fieldErrors } = useAction(createBoard, {
		onSuccess: (data) => {
			toast.success('Board created!')
			closeRef.current?.click()
			router.push(`/board/${data.id}`)
		},

		onError: (error) => {
			toast.error(error)
			proModal.onOpen()
		},
	})

	const onSubmit = (formData: FormData) => {
		const title = formData.get('title') as string
		const image = formData.get('image') as string
		// console.log('image:', image)

		execute({ title, image })
	}

	return (
		<Popover>
			<PopoverTrigger asChild>{children}</PopoverTrigger>

			<PopoverContent align={align} side={side} sideOffset={sideOffset} className="w-80 pt-3">
				<div className="text-sm font-medium text-center text-neutral-600 pb-4">Create board</div>

				<Button
					variant="ghost"
					ref={closeRef}
					className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600"
				>
					<X className="h-4 w-4" />
				</Button>

				<form action={onSubmit} className="space-y-4">
					<div className="space-y-4">
						<FormPicker id="image" errors={fieldErrors} />

						<FormInput id="title" label="Board title" type="text" errors={fieldErrors} />
					</div>

					<FormSubmit className="w-full">Create</FormSubmit>
				</form>
			</PopoverContent>
		</Popover>
	)
}
