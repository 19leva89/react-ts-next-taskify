'use client'

import { toast } from 'sonner'
import { List } from '@prisma/client'
import { MoreHorizontalIcon, XIcon } from 'lucide-react'

import {
	Button,
	Popover,
	PopoverClose,
	PopoverContent,
	PopoverTrigger,
	Separator,
} from '@/components/ui'
import { useAction } from '@/hooks/use-action'
import { copyList } from '@/actions/copy-list'
import { deleteList } from '@/actions/delete-list'
import { FormSubmit } from '@/components/shared/form/form-submit'

interface Props {
	data: List
	onAddCard: () => void
}

export const ListOptions = ({ data, onAddCard }: Props) => {
	const { execute: executeDelete } = useAction(deleteList, {
		onSuccess: (data) => {
			toast.success(`List '${data.title}' deleted!`)
		},

		onError: (error) => {
			toast.error(error)
		},
	})

	const { execute: executeCopy } = useAction(copyList, {
		onSuccess: (data) => {
			toast.success(`List '${data.title}' copied!`)
		},

		onError: (error) => {
			toast.error(error)
		},
	})

	const onCopy = (formData: FormData) => {
		const id = formData.get('id') as string
		const boardId = formData.get('boardId') as string

		executeCopy({ id, boardId })
	}

	const onDelete = (formData: FormData) => {
		const id = formData.get('id') as string
		const boardId = formData.get('boardId') as string

		executeDelete({ id, boardId })
	}

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant="ghost" className="h-auto w-auto p-2 transition-colors ease-in-out duration-300">
					<MoreHorizontalIcon className="h-4 w-4" />
				</Button>
			</PopoverTrigger>

			<PopoverContent className="px-0 pt-3 pb-3" side="bottom" align="start">
				<div className="text-sm font-medium text-center text-neutral-600 pb-4">List actions</div>

				<PopoverClose asChild>
					<Button
						variant="ghost"
						size="icon"
						className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600 transition-colors ease-in-out duration-300"
					>
						<XIcon className="h-4 w-4" />
					</Button>
				</PopoverClose>

				<Button
					variant="ghost"
					onClick={onAddCard}
					className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm transition-colors ease-in-out duration-300"
				>
					Add card...
				</Button>

				<form action={onCopy}>
					<input hidden id="id" name="id" defaultValue={data.id} />

					<input hidden id="boardId" name="boardId" defaultValue={data.boardId} />

					<FormSubmit
						variant="ghost"
						className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
					>
						Copy list...
					</FormSubmit>
				</form>

				<Separator />

				<form action={onDelete}>
					<input hidden id="id" name="id" defaultValue={data.id} />

					<input hidden id="boardId" name="boardId" defaultValue={data.boardId} />

					<FormSubmit
						variant="ghost"
						className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
					>
						Delete this list...
					</FormSubmit>
				</form>
			</PopoverContent>
		</Popover>
	)
}
