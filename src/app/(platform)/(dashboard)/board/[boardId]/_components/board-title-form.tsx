'use client'

import { toast } from 'sonner'
import { Board } from '@prisma/client'
import { ComponentRef, useRef, useState } from 'react'

import { Button } from '@/components/ui'
import { useAction } from '@/hooks/use-action'
import { updateBoard } from '@/actions/update-board'
import { FormInput } from '@/components/shared/form/form-input'

interface Props {
	data: Board
}

export const BoardTitleForm = ({ data }: Props) => {
	const { execute } = useAction(updateBoard, {
		onSuccess: (data) => {
			toast.success(`Board '${data.title}' updated!`)
			setTitle(data.title)
			disableEditing()
		},

		onError: (error) => {
			toast.error(error)
		},
	})

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

	const onSubmit = (formData: FormData) => {
		const title = formData.get('title') as string

		execute({ id: data.id, title })
	}

	const onBlur = () => {
		formRef.current?.requestSubmit()
	}

	if (isEditing) {
		return (
			<form action={onSubmit} ref={formRef} className='flex items-center gap-x-2'>
				<FormInput
					id='title'
					ref={inputRef}
					onBlur={onBlur}
					defaultValue={title}
					className=' h-7 border-none bg-transparent px-[7px] py-1 text-lg font-bold focus-visible:ring-transparent focus-visible:outline-none'
				/>
			</form>
		)
	}

	return (
		<Button
			variant='transparent'
			onClick={enableEditing}
			className='size-auto p-1 px-2 text-lg font-bold transition-colors duration-300 ease-in-out'
		>
			{title}
		</Button>
	)
}
