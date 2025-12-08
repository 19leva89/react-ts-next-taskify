import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'

import { prisma } from '@/lib/prisma'
import { ENTITY_TYPE } from '@/lib/prisma-enums'

interface Props {
	params: Promise<{ cardId: string }>
}

export async function GET(req: NextRequest, { params }: Props) {
	try {
		const { userId, orgId } = await auth()

		if (!userId || !orgId) {
			return new NextResponse('Unauthorized', { status: 401 })
		}

		const auditLogs = await prisma.auditLog.findMany({
			where: { orgId, entityId: (await params).cardId, entityType: ENTITY_TYPE.CARD },
			orderBy: { createdAt: 'desc' },
			take: 3,
		})

		return NextResponse.json(auditLogs)
	} catch {
		return new NextResponse('Internal Error', { status: 500 })
	}
}
