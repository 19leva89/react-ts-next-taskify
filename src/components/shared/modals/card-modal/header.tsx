'use client'

import { toast } from 'sonner'
import { LayoutIcon } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query'
import { ComponentRef, useRef, useState } from 'react'

import { CardWithList } from '@/types'
import { Skeleton } from '@/components/ui'
import { useAction } from '@/hooks/use-action'
import { updateCard } from '@/actions/update-card'
import { FormInput } from '@/components/shared/form/form-input'

interface Props {
	data: CardWithList
}

export const Header = ({ data }: Props) => {
	const params = useParams()
	const queryClient = useQueryClient()

	const inputRef = useRef<ComponentRef<'input'>>(null)

	const [title, setTitle] = useState(data.title)

	const { execute } = useAction(updateCard, {
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: ['card', data.id] })

			queryClient.invalidateQueries({ queryKey: ['card-logs', data.id] })

			toast.success(`Renamed to '${data.title}'`)
			setTitle(data.title)
		},

		onError: (error) => {
			toast.error(error)
		},
	})

	const onSubmit = (formData: FormData) => {
		const title = formData.get('title') as string
		const boardId = params.boardId as string

		if (title === data.title) {
			return
		}

		execute({ id: data.id, boardId, title })
	}

	const onBlur = () => {
		inputRef.current?.form?.requestSubmit()
	}

	return (
		<div className="flex items-start gap-x-3 mb-6 w-full">
			<LayoutIcon className="size-5 mt-1 text-neutral-700" />

			<div className="w-full">
				<form action={onSubmit}>
					<FormInput
						id="title"
						ref={inputRef}
						onBlur={onBlur}
						defaultValue={title}
						className="font-semibold text-xl px-1 text-neutral-700 bg-transparent border-transparent relative -left-1.5 w-[95%] focus-visible:bg-white focus-visible:border-input mb-0.5 truncate"
					/>
				</form>

				<p className="text-sm text-muted-foreground">
					in list <span className="underline">{data.list.title}</span>
				</p>
			</div>
		</div>
	)
}

Header.Skeleton = function SkeletonHeader() {
	return (
		<div className="flex items-start gap-x-3 mb-6">
			<Skeleton className="size-6 mt-1 bg-neutral-200" />

			<div>
				<Skeleton className="h-6 w-24 mb-1 bg-neutral-200" />
				<Skeleton className="h-4 w-12 mb-1 bg-neutral-200" />
			</div>
		</div>
	)
}
