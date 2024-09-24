import { auth } from '@clerk/nextjs/server'

import { prisma } from '@/lib/db'
import { MAX_FREE_BOARDS } from '@/constants/boards'

const getOrgLimit = async (orgId: string) => {
	try {
		return await prisma.orgLimit.findUnique({
			where: { orgId },
		})
	} catch (error) {
		console.error('Error fetching org limit in getOrgLimit:', error)
		throw error
	}
}

export const incrementAvailableCount = async (): Promise<void> => {
	try {
		const { orgId } = auth()

		if (!orgId) {
			throw new Error('Unauthorized')
		}

		await prisma.orgLimit.upsert({
			where: { orgId },
			update: { count: { increment: 1 } },
			create: { orgId, count: 1 },
		})
	} catch (error) {
		console.error('Error incrementing count:', error)
	}
}

export const decreaseAvailableCount = async (): Promise<void> => {
	try {
		const { orgId } = auth()

		if (!orgId) {
			throw new Error('Unauthorized')
		}

		await prisma.orgLimit.upsert({
			where: { orgId },
			update: { count: { decrement: 1 } },
			create: { orgId, count: 0 },
		})

		const updatedOrgLimit = await getOrgLimit(orgId)

		if (updatedOrgLimit && updatedOrgLimit.count < 0) {
			await prisma.orgLimit.update({
				where: { orgId },
				data: { count: 0 },
			})
		}
	} catch (error) {
		console.error('Error decreasing count:', error)
	}
}

export const hasAvailableCount = async (): Promise<boolean> => {
	try {
		const { orgId } = auth()

		if (!orgId) {
			throw new Error('Unauthorized')
		}

		const orgLimit = await getOrgLimit(orgId)

		return !orgLimit || orgLimit.count < MAX_FREE_BOARDS
	} catch (error) {
		console.error('Error checking available count:', error)
		return false
	}
}

export const getAvailableCount = async (): Promise<number> => {
	try {
		const { orgId } = auth()

		if (!orgId) {
			return 0
		}

		const orgLimit = await getOrgLimit(orgId)

		return orgLimit ? orgLimit.count : 0
	} catch (error) {
		console.error('Error getting available count:', error)
		return 0
	}
}
