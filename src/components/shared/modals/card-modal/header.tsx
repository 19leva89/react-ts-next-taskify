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
		<div className='mb-6 flex w-full items-start gap-x-3'>
			<LayoutIcon className='mt-1 size-5 text-neutral-700' />

			<div className='w-full'>
				<form action={onSubmit}>
					<FormInput
						id='title'
						ref={inputRef}
						onBlur={onBlur}
						defaultValue={title}
						className='relative -left-1.5 mb-0.5 w-[95%] truncate border-transparent bg-transparent px-1 text-xl font-semibold text-neutral-700 focus-visible:border-input focus-visible:bg-white'
					/>
				</form>

				<p className='text-sm text-muted-foreground'>
					in list <span className='underline'>{data.list.title}</span>
				</p>
			</div>
		</div>
	)
}

Header.Skeleton = function SkeletonHeader() {
	return (
		<div className='mb-6 flex items-start gap-x-3'>
			<Skeleton className='mt-1 size-6 bg-neutral-200' />

			<div>
				<Skeleton className='mb-1 h-6 w-24 bg-neutral-200' />
				<Skeleton className='mb-1 h-4 w-12 bg-neutral-200' />
			</div>
		</div>
	)
}
