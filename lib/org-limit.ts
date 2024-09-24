import { auth } from '@clerk/nextjs/server'

import { prisma } from '@/lib/db'
import { MAX_FREE_BOARDS } from '@/constants/boards'

export const incrementAvailableCount = async () => {
	try {
		const { orgId } = auth()

		if (!orgId) {
			throw new Error('Unauthorized')
		}

		const orgLimit = await prisma.orgLimit.findUnique({
			where: {
				orgId,
			},
		})

		if (orgLimit) {
			await prisma.orgLimit.update({
				where: { orgId },
				data: { count: orgLimit.count + 1 },
			})
		} else {
			await prisma.orgLimit.create({
				data: { orgId, count: 1 },
			})
		}
	} catch (error) {
		console.log(error)
	}
}

export const decreaseAvailableCount = async () => {
	try {
		const { orgId } = auth()

		if (!orgId) {
			throw new Error('Unauthorized')
		}

		const orgLimit = await prisma.orgLimit.findUnique({
			where: {
				orgId,
			},
		})

		if (orgLimit) {
			await prisma.orgLimit.update({
				where: { orgId },
				data: { count: orgLimit.count > 0 ? orgLimit.count - 1 : 0 },
			})
		} else {
			await prisma.orgLimit.create({
				data: { orgId, count: 1 },
			})
		}
	} catch (error) {
		console.log(error)
	}
}

export const hasAvailableCount = async () => {
	try {
		const { orgId } = auth()

		if (!orgId) {
			throw new Error('Unauthorized')
		}

		const orgLimit = await prisma.orgLimit.findUnique({
			where: { orgId },
		})

		if (!orgLimit || orgLimit.count < MAX_FREE_BOARDS) {
			return true
		} else {
			return false
		}
	} catch (error) {
		console.error('Error available count:', error)
	}
}

export const getAvailableCount = async () => {
	try {
		const { orgId } = auth()

		if (!orgId) {
			return 0
		}

		const orgLimit = await prisma.orgLimit.findUnique({
			where: { orgId },
		})

		if (!orgLimit) {
			return 0
		}

		if (orgLimit.count >= MAX_FREE_BOARDS) {
			return MAX_FREE_BOARDS
		}

		return orgLimit.count
	} catch (error) {
		console.error('Error get available count:', error)
	}
}
