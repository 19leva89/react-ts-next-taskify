'use client'

import { toast } from 'sonner'
import { Plus, X } from 'lucide-react'
import { ElementRef, useRef, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useEventListener, useOnClickOutside } from 'usehooks-ts'

import { useAction } from '@/hooks/use-action'
import { Button } from '@/components/ui/button'
import { createList } from '@/actions/create-list'
import { FormInput } from '@/components/form/form-input'
import { FormSubmit } from '@/components/form/form-submit'

import { ListWrapper } from './list-wrapper'

export const ListForm = () => {
	const router = useRouter()
	const params = useParams()
	const formRef = useRef<ElementRef<'form'>>(null)
	const inputRef = useRef<ElementRef<'input'>>(null)

	const [isEditing, setIsEditing] = useState(false)

	const enableEditing = () => {
		setIsEditing(true)

		setTimeout(() => {
			inputRef.current?.focus()
			inputRef.current?.select()
		})
	}

	const disableEditing = () => {
		setIsEditing(false)
	}

	const { execute, fieldErrors } = useAction(createList, {
		onSuccess: (data) => {
			toast.success(`List '${data.title}' created!`)
			disableEditing()
			router.refresh()
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

	const onSubmit = (formData: FormData) => {
		const title = formData.get('title') as string
		const boardId = formData.get('boardId') as string
		// console.log('boardId:', boardId)

		execute({ title, boardId })
	}

	useEventListener('keydown', onKeyDown)
	useOnClickOutside(formRef, disableEditing)

	if (isEditing) {
		return (
			<ListWrapper>
				<form
					action={onSubmit}
					ref={formRef}
					className="w-full p-3 rounded-md bg-white space-y-4 shadow-md"
				>
					<FormInput
						id="title"
						ref={inputRef}
						errors={fieldErrors}
						className=" text-sm font-medium px-2 py-1 h-7 border-transparent hover:border-input focus:border-input transition"
						placeholder="Enter list title..."
					/>

					<input hidden value={params.boardId} name="boardId" />

					<div className="flex items-center gap-x-1">
						<FormSubmit>Add list</FormSubmit>

						<Button onClick={disableEditing} size="sm" variant="ghost">
							<X className="h-5 w-5" />
						</Button>
					</div>
				</form>
			</ListWrapper>
		)
	}

	return (
		<ListWrapper>
			<button
				onClick={enableEditing}
				className="w-full rounded-md bg-white/80 hover:bg-white/50 transition p-3 flex items-center font-medium text-sm"
			>
				<Plus h-4 w-4 mr-2 />
				Add a list
			</button>
		</ListWrapper>
	)
}