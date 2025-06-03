'use client'

import { ComponentRef, useRef, useState } from 'react'
import { Draggable, Droppable } from '@hello-pangea/dnd'

import { cn } from '@/lib'
import { ListWithCards } from '@/types'
import { CardForm } from '@/app/(platform)/(dashboard)/board/[boardId]/_components/card-form'
import { CardItem } from '@/app/(platform)/(dashboard)/board/[boardId]/_components/card-item'
import { ListHeader } from '@/app/(platform)/(dashboard)/board/[boardId]/_components/list-header'

interface ListItemProps {
	index: number
	data: ListWithCards
}

export const ListItem = ({ index, data }: ListItemProps) => {
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

	return (
		<Draggable draggableId={data.id} index={index}>
			{(provided) => (
				<li {...provided.draggableProps} ref={provided.innerRef} className='h-full w-68 shrink-0 select-none'>
					<div {...provided.dragHandleProps} className='w-full rounded-md bg-[#f1f2f4] pb-2 shadow-md'>
						<ListHeader onAddCard={enableEditing} data={data} />

						<Droppable droppableId={data.id} type='card'>
							{(provided) => (
								<ol
									{...provided.droppableProps}
									ref={provided.innerRef}
									className={cn(
										'mx-1 flex flex-col gap-y-2 px-1 py-0.5',
										data.cards.length > 0 ? 'mt-2' : 'mt-0',
									)}
								>
									{data.cards.map((card, index) => (
										<CardItem key={card.id} index={index} data={card} />
									))}

									{provided.placeholder}
								</ol>
							)}
						</Droppable>

						<CardForm
							listId={data.id}
							ref={textareaRef}
							isEditing={isEditing}
							enableEditing={enableEditing}
							disableEditing={disableEditing}
						/>
					</div>
				</li>
			)}
		</Draggable>
	)
}
