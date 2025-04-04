'use client'

import { toast } from 'sonner'
import { useParams } from 'next/navigation'
import { AlignLeftIcon } from 'lucide-react'
import { useQueryClient } from '@tanstack/react-query'
import { useEventListener, useOnClickOutside } from 'usehooks-ts'
import { ComponentRef, RefObject, useRef, useState } from 'react'

import { CardWithList } from '@/types'
import { useAction } from '@/hooks/use-action'
import { updateCard } from '@/actions/update-card'

import { Button, Skeleton } from '@/components/ui'
import { FormSubmit } from '@/components/shared/form/form-submit'
import { FormTextarea } from '@/components/shared/form/form-textarea'

interface Props {
	data: CardWithList
}

export const Description = ({ data }: Props) => {
	const params = useParams()
	const queryClient = useQueryClient()

	const { execute, fieldErrors } = useAction(updateCard, {
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: ['card', data.id] })

			queryClient.invalidateQueries({ queryKey: ['card-logs', data.id] })

			toast.success(`Card '${data.title}' updated`)
			disableEditing()
		},

		onError: (error) => {
			toast.error(error)
		},
	})

	const formRef = useRef<ComponentRef<'form'>>(null)
	const textareaRef = useRef<ComponentRef<'textarea'>>(null)

	const [isEditing, setIsEditing] = useState(false)

	const enableEditing = () => {
		setIsEditing(true)

		setTimeout(() => {
			textareaRef.current?.focus()
			textareaRef.current?.select()
		})
	}

	const disableEditing = () => {
		setIsEditing(false)
	}

	const onKeyDown = (e: KeyboardEvent) => {
		if (e.key === 'Escape') {
			disableEditing()
		}
	}

	const onSubmit = (formData: FormData) => {
		const description = formData.get('description') as string
		const boardId = params.boardId as string

		// console.log('Description:', description, boardId)

		execute({ id: data.id, description, boardId })
	}

	useEventListener('keydown', onKeyDown)
	useOnClickOutside(formRef as RefObject<HTMLElement>, disableEditing)

	return (
		<div className="flex items-start gap-x-3 w-full">
			<AlignLeftIcon className="h-5 w-5 mt-0.5 text-neutral-700" />

			<div className="w-full">
				<p className="font-semibold text-neutral-700 mb-2">Description</p>

				{isEditing ? (
					<form action={onSubmit} ref={formRef} className="space-y-2">
						<FormTextarea
							id="description"
							className="w-full mt-2"
							placeholder="Add a more detailed description"
							defaultValue={data.description || undefined}
							errors={fieldErrors}
							ref={textareaRef}
						/>

						<div className="flex items-center justify-end gap-x-2">
							<FormSubmit>Save</FormSubmit>

							<Button
								variant="default"
								size="sm"
								type="button"
								onClick={disableEditing}
								className="transition-colors ease-in-out duration-300"
							>
								Cancel
							</Button>
						</div>
					</form>
				) : (
					<div
						role="button"
						onClick={enableEditing}
						className="min-h-[78px] bg-neutral-200 text-sm font-medium py-3 px-3.5 rounded-md break-words"
					>
						{data.description || 'Add a more detailed description...'}
					</div>
				)}
			</div>
		</div>
	)
}

Description.Skeleton = function SkeletonDescription() {
	return (
		<div className="flex items-start gap-x-3 w-full">
			<Skeleton className="h-6 w-6 bg-neutral-200" />

			<div className="w-full">
				<Skeleton className="h-6 w-24 mb-2 bg-neutral-200" />
				<Skeleton className="h-[78px] w-full bg-neutral-200" />
			</div>
		</div>
	)
}
