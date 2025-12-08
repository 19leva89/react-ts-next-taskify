'use client'

import { toast } from 'sonner'
import { MoreHorizontalIcon, XIcon } from 'lucide-react'

import { useAction } from '@/hooks/use-action'
import { copyList } from '@/actions/copy-list'
import { List } from '@/generated/prisma/client'
import { deleteList } from '@/actions/delete-list'
import { FormSubmit } from '@/components/shared/form/form-submit'
import { Button, Popover, PopoverClose, PopoverContent, PopoverTrigger, Separator } from '@/components/ui'

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
				<Button variant='ghost' className='size-auto p-2 transition-colors duration-300 ease-in-out'>
					<MoreHorizontalIcon className='size-4' />
				</Button>
			</PopoverTrigger>

			<PopoverContent className='px-0 pt-3 pb-3' side='bottom' align='start'>
				<div className='pb-4 text-center text-sm font-medium text-neutral-600'>List actions</div>

				<PopoverClose asChild>
					<Button
						variant='ghost'
						size='icon'
						className='absolute top-2 right-2 size-auto p-2 text-neutral-600 transition-colors duration-300 ease-in-out'
					>
						<XIcon className='size-4' />
					</Button>
				</PopoverClose>

				<Button
					variant='ghost'
					onClick={onAddCard}
					className='h-auto w-full justify-start rounded-none p-2 px-5 text-sm font-normal transition-colors duration-300 ease-in-out'
				>
					Add card...
				</Button>

				<form action={onCopy}>
					<input hidden id='id' name='id' defaultValue={data.id} />

					<input hidden id='boardId' name='boardId' defaultValue={data.boardId} />

					<FormSubmit
						variant='ghost'
						className='h-auto w-full justify-start rounded-none p-2 px-5 text-sm font-normal'
					>
						Copy list...
					</FormSubmit>
				</form>

				<Separator />

				<form action={onDelete}>
					<input hidden id='id' name='id' defaultValue={data.id} />

					<input hidden id='boardId' name='boardId' defaultValue={data.boardId} />

					<FormSubmit
						variant='ghost'
						className='h-auto w-full justify-start rounded-none p-2 px-5 text-sm font-normal'
					>
						Delete this list...
					</FormSubmit>
				</form>
			</PopoverContent>
		</Popover>
	)
}
