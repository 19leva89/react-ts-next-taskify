'use client'

import { AuditLog } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'

import { CardWithList } from '@/types'
import { fetcher } from '@/lib/fetcher'
import { useCardModal } from '@/hooks/use-card-modal'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui'
import { Header } from '@/components/shared/modals/card-modal/header'
import { Actions } from '@/components/shared/modals/card-modal/actions'
import { Activity } from '@/components/shared/modals/card-modal/activity'
import { Description } from '@/components/shared/modals/card-modal/description'

export const CardModal = () => {
	const id = useCardModal((state) => state.id)
	const isOpen = useCardModal((state) => state.isOpen)
	const onClose = useCardModal((state) => state.onClose)

	const { data: cardData } = useQuery<CardWithList>({
		queryKey: ['card', id],
		queryFn: () => fetcher(`/api/cards/${id}`),
	})

	const { data: auditLogsData } = useQuery<AuditLog[]>({
		queryKey: ['card-logs', id],
		queryFn: () => fetcher(`/api/cards/${id}/logs`),
	})

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className='bg-white' aria-describedby={undefined}>
				<DialogTitle>{!cardData ? <Header.Skeleton /> : <Header data={cardData} />}</DialogTitle>

				<div className='grid grid-cols-1 md:grid-cols-4 md:gap-4'>
					<div className='col-span-3'>
						<div className='w-full space-y-6'>
							{!cardData ? <Description.Skeleton /> : <Description data={cardData} />}

							{!auditLogsData ? <Activity.Skeleton /> : <Activity data={auditLogsData} />}
						</div>
					</div>

					{!cardData ? <Actions.Skeleton /> : <Actions data={cardData} />}
				</div>
			</DialogContent>
		</Dialog>
	)
}
