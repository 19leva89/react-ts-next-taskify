import Stripe from 'stripe'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'

import { prisma } from '@/lib/db'
import { stripe } from '@/lib/stripe'

export async function POST(req: Request) {
	const body = await req.text()
	const signature = headers().get('Stripe-Signature') as string

	if (!signature) {
		return new NextResponse('Missing Stripe signature', { status: 400 })
	}

	let event: Stripe.Event

	try {
		event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!)
	} catch (error) {
		console.error(`Webhook signature verification failed:`, error)
		return new NextResponse('Webhook error', { status: 400 })
	}

	const session = event.data.object as Stripe.Checkout.Session

	if (event.type === 'checkout.session.completed') {
		const subscription = await stripe.subscriptions.retrieve(session.subscription as string)

		if (!session?.metadata?.orgId) {
			return new NextResponse('Org ID is required', { status: 400 })
		}

		try {
			await prisma.orgSubscription.create({
				data: {
					orgId: session.metadata.orgId,
					stripeCustomerId: subscription.customer as string,
					stripeSubscriptionId: subscription.id,
					stripePriceId: subscription.items.data[0].price.id,
					stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
				},
			})
		} catch (error) {
			console.error('Database error:', error)
			return new NextResponse('Database error', { status: 500 })
		}
	}

	if (event.type === 'invoice.payment_succeeded') {
		const subscription = await stripe.subscriptions.retrieve(session.subscription as string)

		const subscriptionRecord = await prisma.orgSubscription.findUnique({
			where: {
				stripeSubscriptionId: subscription.id,
			},
		})

		if (!subscriptionRecord) {
			console.error('Subscription record not found for ID:', subscription.id)
			return new NextResponse('Subscription record not found', { status: 404 })
		}

		try {
			await prisma.orgSubscription.update({
				where: {
					stripeSubscriptionId: subscription.id,
				},
				data: {
					stripePriceId: subscription.items.data[0].price.id,
					stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
				},
			})
		} catch (error) {
			console.error('Database update error:', error)
			return new NextResponse('Database update error', { status: 500 })
		}
	}

	return new NextResponse(null, { status: 200 })
}
