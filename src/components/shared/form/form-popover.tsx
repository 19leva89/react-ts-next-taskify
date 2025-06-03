'use client'

import { toast } from 'sonner'
import { XIcon } from 'lucide-react'
import { ReactNode } from 'react'
import { useRouter } from 'next/navigation'

import { useAction } from '@/hooks/use-action'
import { useProModal } from '@/hooks/use-pro-modal'
import { createBoard } from '@/actions/create-board'
import { FormInput } from '@/components/shared/form/form-input'
import { FormSubmit } from '@/components/shared/form/form-submit'
import { FormPicker } from '@/components/shared/form/form-picker'
import { Button, Popover, PopoverClose, PopoverContent, PopoverTrigger } from '@/components/ui'

interface Props {
	children: ReactNode
	side?: 'left' | 'right' | 'top' | 'bottom'
	align?: 'start' | 'center' | 'end'
	sideOffset?: number
}

export const FormPopover = ({ children, side = 'bottom', align, sideOffset = 0 }: Props) => {
	const router = useRouter()
	const proModal = useProModal()

	const { execute, fieldErrors } = useAction(createBoard, {
		onSuccess: (data) => {
			toast.success('Board created!')

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

			<PopoverContent align={align} side={side} sideOffset={sideOffset} className='w-80 pt-3'>
				<div className='pb-4 text-center text-sm font-medium text-neutral-600'>Create board</div>

				<PopoverClose asChild>
					<Button
						variant='ghost'
						size='icon'
						className='absolute top-2 right-2 size-auto p-2 text-neutral-600 transition-colors duration-300 ease-in-out'
					>
						<XIcon className='size-4' />
					</Button>
				</PopoverClose>

				<form action={onSubmit} className='space-y-4'>
					<div className='space-y-4'>
						<FormPicker id='image' errors={fieldErrors} />

						<FormInput id='title' label='Board title' type='text' errors={fieldErrors} />
					</div>

					<FormSubmit className='w-full'>Create</FormSubmit>
				</form>
			</PopoverContent>
		</Popover>
	)
}
