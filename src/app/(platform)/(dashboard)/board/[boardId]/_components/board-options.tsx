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
					variant="transparent"
					size="icon"
					className="h-auto w-auto p-2 transition-colors ease-in-out duration-300"
				>
					<MoreHorizontalIcon className="h-4 w-4" />
				</Button>
			</PopoverTrigger>

			<PopoverContent className="px-0 pt-3 pb-3" side="bottom" align="start">
				<div className="text-sm font-medium text-center text-neutral-600 pb-4">Board actions</div>

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
					onClick={onDelete}
					disabled={isLoading}
					className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm transition-colors ease-in-out duration-300"
				>
					Delete this board
				</Button>
			</PopoverContent>
		</Popover>
	)
}
