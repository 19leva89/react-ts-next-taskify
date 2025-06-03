'use client'

import { toast } from 'sonner'
import { PlusIcon, XIcon } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useEventListener, useOnClickOutside } from 'usehooks-ts'
import { ComponentRef, forwardRef, KeyboardEventHandler, RefObject, useRef } from 'react'

import { Button } from '@/components/ui'
import { useAction } from '@/hooks/use-action'
import { createCard } from '@/actions/create-card'
import { FormSubmit } from '@/components/shared/form/form-submit'
import { FormTextarea } from '@/components/shared/form/form-textarea'

interface Props {
	listId: string
	isEditing: boolean
	enableEditing: () => void
	disableEditing: () => void
}

export const CardForm = forwardRef<HTMLTextAreaElement, Props>(
	({ listId, isEditing, enableEditing, disableEditing }, ref) => {
		const params = useParams()
		const formRef = useRef<ComponentRef<'form'>>(null)

		const { execute, fieldErrors } = useAction(createCard, {
			onSuccess: (data) => {
				toast.success(`Card '${data.title}' created!`)
				formRef.current?.reset()
			},

			onError: (error) => {
				toast.error(error)
			},
		})

		const onKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				disableEditing()
			}
		}

		const onTextareaKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
			if (e.key === 'Enter' && !e.shiftKey) {
				e.preventDefault()
				formRef.current?.requestSubmit()
			}
		}

		const onSubmit = (formData: FormData) => {
			const title = formData.get('title') as string
			const listId = formData.get('listId') as string
			const boardId = formData.get('boardId') as string

			// console.log('CardForm:', title, listId, boardId)

			execute({ title, listId, boardId })
		}

		useEventListener('keydown', onKeyDown)
		useOnClickOutside(formRef as RefObject<HTMLElement>, disableEditing)

		if (isEditing) {
			return (
				<form action={onSubmit} ref={formRef} className='m-1 space-y-4 px-1 py-0.5'>
					<FormTextarea
						id='title'
						ref={ref}
						onKeyDown={onTextareaKeyDown}
						errors={fieldErrors}
						className='border-transparent bg-white transition hover:border-input focus:border-input'
						placeholder='Enter a title for this card...'
					/>

					<input hidden id='listId' defaultValue={listId} name='listId' />
					<input hidden id='boardId' defaultValue={params.boardId} name='boardId' />

					<div className='flex items-center gap-x-1'>
						<FormSubmit>Add card</FormSubmit>

						<Button
							variant='ghost'
							size='sm'
							onClick={disableEditing}
							className='transition-colors duration-300 ease-in-out'
						>
							<XIcon className='size-5' />
						</Button>
					</div>
				</form>
			)
		}

		return (
			<div className='px-2 pt-2'>
				<Button
					variant='ghost'
					size='sm'
					onClick={enableEditing}
					className='h-auto w-full justify-start px-2 py-1.5 text-sm text-muted-foreground transition-colors duration-300 ease-in-out'
				>
					<PlusIcon className='mr-2 size-4' />
					Add a card
				</Button>
			</div>
		)
	},
)

CardForm.displayName = 'CardForm'
