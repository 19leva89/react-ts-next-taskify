'use client'

import { toast } from 'sonner'
import { Plus, X } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useEventListener, useOnClickOutside } from 'usehooks-ts'
import { ElementRef, forwardRef, KeyboardEventHandler, useRef } from 'react'

import { useAction } from '@/hooks/use-action'
import { Button } from '@/components/ui/button'
import { createCard } from '@/actions/create-card'
import { FormSubmit } from '@/components/form/form-submit'
import { FormTextarea } from '@/components/form/form-textarea'

interface CardFormProps {
	listId: string
	isEditing: boolean
	enableEditing: () => void
	disableEditing: () => void
}

export const CardForm = forwardRef<HTMLTextAreaElement, CardFormProps>(
	({ listId, isEditing, enableEditing, disableEditing }, ref) => {
		const params = useParams()
		const formRef = useRef<ElementRef<'form'>>(null)

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
		useOnClickOutside(formRef, disableEditing)

		if (isEditing) {
			return (
				<form action={onSubmit} ref={formRef} className="m-1 py-0.5 px-1 space-y-4">
					<FormTextarea
						id="title"
						ref={ref}
						onKeyDown={onTextareaKeyDown}
						errors={fieldErrors}
						className="border-transparent hover:border-input focus:border-input transition bg-white"
						placeholder="Enter a title for this card..."
					/>

					<input hidden id="listId" defaultValue={listId} name="listId" />
					<input hidden id="boardId" defaultValue={params.boardId} name="boardId" />

					<div className="flex items-center gap-x-1">
						<FormSubmit>Add card</FormSubmit>

						<Button onClick={disableEditing} size="sm" variant="ghost">
							<X className="h-5 w-5" />
						</Button>
					</div>
				</form>
			)
		}

		return (
			<div className="pt-2 px-2">
				<Button
					onClick={enableEditing}
					className="h-auto px-2 py-1.5 w-full justify-start text-muted-foreground text-sm"
					size="sm"
					variant="ghost"
				>
					<Plus className="h-4 w-4 mr-2" />
					Add a card
				</Button>
			</div>
		)
	},
)

CardForm.displayName = 'CardForm'
