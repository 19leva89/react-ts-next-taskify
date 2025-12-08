import { format } from 'date-fns'

import { AuditLog } from '@/generated/prisma/client'
import { Avatar, AvatarImage } from '@/components/ui'
import { generateLogMessage } from '@/lib/generate-log-message'

interface Props {
	data: AuditLog
}

export const ActivityItem = ({ data }: Props) => {
	return (
		<li className='flex items-center gap-x-2'>
			<Avatar className='size-8'>
				<AvatarImage src={data.userImage} />
			</Avatar>

			<div className='flex flex-col space-y-0.5'>
				<p className='text-sm text-muted-foreground'>
					<span className='font-semibold text-neutral-700 lowercase'>{data.userName}</span>{' '}
					{generateLogMessage(data)}
				</p>

				<p className='text-xs text-muted-foreground'>
					{format(new Date(data.createdAt), "d MMM. yyyy 'at' HH:mm")}
				</p>
			</div>
		</li>
	)
}
