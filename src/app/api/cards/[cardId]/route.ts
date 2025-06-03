import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'

import { prisma } from '@/lib/db'

interface Props {
	params: Promise<{ cardId: string }>
}

export async function GET(req: NextRequest, { params }: Props) {
	try {
		const { userId, orgId } = await auth()

		if (!userId || !orgId) {
			return new NextResponse('Unauthorized', { status: 401 })
		}

		const card = await prisma.card.findUnique({
			where: { id: (await params).cardId, list: { board: { orgId } } },
			include: { list: { select: { title: true } } },
		})

		return NextResponse.json(card)
	} catch {
		return new NextResponse('Internal Error', { status: 500 })
	}
}
