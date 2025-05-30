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
			<form action={onSubmit} ref={formRef} className="flex items-center gap-x-2">
				<FormInput
					id="title"
					ref={inputRef}
					onBlur={onBlur}
					defaultValue={title}
					className=" text-lg font-bold px-[7px] py-1 h-7 bg-transparent focus-visible:outline-none focus-visible:ring-transparent border-none"
				/>
			</form>
		)
	}

	return (
		<Button
			variant="transparent"
			onClick={enableEditing}
			className="font-bold text-lg size-auto p-1 px-2 transition-colors ease-in-out duration-300"
		>
			{title}
		</Button>
	)
}
