'use client'

import { toast } from 'sonner'
import { useParams } from 'next/navigation'
import { CopyIcon, TrashIcon } from 'lucide-react'

import { CardWithList } from '@/types'
import { copyCard } from '@/actions/copy-card'
import { useAction } from '@/hooks/use-action'
import { deleteCard } from '@/actions/delete-card'
import { Button, Skeleton } from '@/components/ui'
import { useCardModal } from '@/hooks/use-card-modal'

interface Props {
	data: CardWithList
}

export const Actions = ({ data }: Props) => {
	const params = useParams()
	const cardModal = useCardModal()

	const { execute: executeCopyCard, isLoading: isLoadingCopy } = useAction(copyCard, {
		onSuccess: (data) => {
			toast.success(`Card '${data.title}' copied`)
			cardModal.onClose()
		},

		onError: (error) => {
			toast.error(error)
		},
	})

	const { execute: executeDeleteCard, isLoading: isLoadingDelete } = useAction(deleteCard, {
		onSuccess: (data) => {
			toast.success(`Card '${data.title}' deleted`)
			cardModal.onClose()
		},

		onError: (error) => {
			toast.error(error)
		},
	})

	const onCopy = () => {
		const boardId = params.boardId as string

		executeCopyCard({ id: data.id, boardId })
	}

	const onDelete = () => {
		const boardId = params.boardId as string

		executeDeleteCard({ id: data.id, boardId })
	}

	return (
		<div className="space-y-2 mt-2">
			<p className="text-xs font-semibold">Actions</p>

			<Button
				onClick={onCopy}
				disabled={isLoadingCopy}
				variant="gray"
				className="w-full justify-start"
				size="inline"
			>
				<CopyIcon className="h-4 w-4 mr-2" />
				Copy
			</Button>

			<Button
				onClick={onDelete}
				disabled={isLoadingDelete}
				variant="gray"
				className="w-full justify-start"
				size="inline"
			>
				<TrashIcon className="h-4 w-4 mr-2" />
				Delete
			</Button>
		</div>
	)
}

Actions.Skeleton = function SkeletonActions() {
	return (
		<div className="space-y-2 mt-2">
			<Skeleton className="h-4 w-20 bg-neutral-200" />
			<Skeleton className="h-8 w-full bg-neutral-200" />
			<Skeleton className="h-8 w-full bg-neutral-200" />
		</div>
	)
}
