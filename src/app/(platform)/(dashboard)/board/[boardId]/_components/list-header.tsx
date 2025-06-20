'use client'

import { toast } from 'sonner'
import { List } from '@prisma/client'
import { useEventListener } from 'usehooks-ts'
import { ComponentRef, useRef, useState } from 'react'

import { useAction } from '@/hooks/use-action'
import { updateList } from '@/actions/update-list'
import { FormInput } from '@/components/shared/form/form-input'
import { ListOptions } from '@/app/(platform)/(dashboard)/board/[boardId]/_components/list-options'

interface Props {
	data: List
	onAddCard: () => void
}

export const ListHeader = ({ data, onAddCard }: Props) => {
	const formRef = useRef<ComponentRef<'form'>>(null)
	const inputRef = useRef<ComponentRef<'input'>>(null)

	const [title, setTitle] = useState(data.title)
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

	const { execute, fieldErrors } = useAction(updateList, {
		onSuccess: (data) => {
			toast.success(`Renamed to '${data.title}'`)
			setTitle(data.title)
			disableEditing()
		},

		onError: (error) => {
			toast.error(error)
		},
	})

	const onKeyDown = (e: KeyboardEvent) => {
		if (e.key === 'Escape') {
			formRef.current?.requestSubmit()
		}
	}

	const onSubmit = (formData: FormData) => {
		const title = formData.get('title') as string
		const id = formData.get('id') as string
		const boardId = formData.get('boardId') as string

		if (title === data.title) {
			return disableEditing()
		}

		execute({ title, id, boardId })
	}

	const onBlur = () => {
		formRef.current?.requestSubmit()
	}

	useEventListener('keydown', onKeyDown)

	return (
		<div className='flex items-start justify-between gap-x-2 px-2 pt-2 text-sm font-semibold'>
			{isEditing ? (
				<form ref={formRef} action={onSubmit} className='flex-1 px-[2px]'>
					<input hidden id='id' name='id' defaultValue={data.id} />

					<input hidden id='boardId' name='boardId' defaultValue={data.boardId} />

					<FormInput
						id='title'
						ref={inputRef}
						onBlur={onBlur}
						errors={fieldErrors}
						placeholder='Enter list title...'
						defaultValue={title}
						className='h-7 truncate border-transparent bg-transparent px-[7px] py-1 text-sm font-medium transition hover:border-input focus:border-input focus:bg-white'
					/>

					<button type='submit' hidden />
				</form>
			) : (
				<div
					onClick={enableEditing}
					className='h-7 w-full border-transparent px-2.5 py-1 text-sm font-medium'
				>
					{title}
				</div>
			)}

			<ListOptions data={data} onAddCard={onAddCard} />
		</div>
	)
}
