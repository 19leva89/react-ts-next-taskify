'use client'

import { toast } from 'sonner'
import { PlusIcon, XIcon } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { useEventListener, useOnClickOutside } from 'usehooks-ts'
import { ComponentRef, RefObject, useRef, useState } from 'react'

import { Button } from '@/components/ui'
import { useAction } from '@/hooks/use-action'
import { createList } from '@/actions/create-list'
import { FormInput } from '@/components/shared/form/form-input'
import { FormSubmit } from '@/components/shared/form/form-submit'
import { ListWrapper } from '@/app/(platform)/(dashboard)/board/[boardId]/_components/list-wrapper'

export const ListForm = () => {
	const router = useRouter()
	const params = useParams()
	const formRef = useRef<ComponentRef<'form'>>(null)
	const inputRef = useRef<ComponentRef<'input'>>(null)

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

		execute({ title, boardId })
	}

	useEventListener('keydown', onKeyDown)
	useOnClickOutside(formRef as RefObject<HTMLElement>, disableEditing)

	if (isEditing) {
		return (
			<ListWrapper>
				<form action={onSubmit} ref={formRef} className='w-full space-y-4 rounded-md bg-white p-3 shadow-md'>
					<FormInput
						id='title'
						ref={inputRef}
						errors={fieldErrors}
						className='h-7 border-transparent px-2 py-1 text-sm font-medium transition hover:border-input focus:border-input'
						placeholder='Enter list title...'
					/>

					<input hidden defaultValue={params.boardId} name='boardId' />

					<div className='flex items-center gap-x-1'>
						<FormSubmit>Add list</FormSubmit>

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
			</ListWrapper>
		)
	}

	return (
		<ListWrapper>
			<button
				onClick={enableEditing}
				className='flex w-full cursor-pointer items-center rounded-md bg-white/80 p-3 text-sm font-medium transition hover:bg-white/50'
			>
				<PlusIcon className='mr-2 size-4' />
				Add a list
			</button>
		</ListWrapper>
	)
}
