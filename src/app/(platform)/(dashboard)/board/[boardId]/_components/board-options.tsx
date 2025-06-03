'use client'

import { toast } from 'sonner'
import { MoreHorizontalIcon, XIcon } from 'lucide-react'

import { useAction } from '@/hooks/use-action'
import { deleteBoard } from '@/actions/delete-board'
import { Button, Popover, PopoverClose, PopoverContent, PopoverTrigger } from '@/components/ui'

interface Props {
	id: string
}

export const BoardOptions = ({ id }: Props) => {
	const { execute, isLoading } = useAction(deleteBoard, {
		onError: (error) => {
			toast.error(error)
		},
	})

	const onDelete = () => {
		execute({ id })
	}

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant='transparent'
					size='icon'
					className='size-auto p-2 transition-colors duration-300 ease-in-out'
				>
					<MoreHorizontalIcon className='size-4' />
				</Button>
			</PopoverTrigger>

			<PopoverContent className='px-0 pt-3 pb-3' side='bottom' align='start'>
				<div className='pb-4 text-center text-sm font-medium text-neutral-600'>Board actions</div>

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
					onClick={onDelete}
					disabled={isLoading}
					className='h-auto w-full justify-start rounded-none p-2 px-5 text-sm font-normal transition-colors duration-300 ease-in-out'
				>
					Delete this board
				</Button>
			</PopoverContent>
		</Popover>
	)
}
