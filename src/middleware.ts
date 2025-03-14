import { NextRequest, NextResponse } from 'next/server'
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isPublicRoute = createRouteMatcher(['/', '/sign-in(.*)', '/sign-up(.*)', '/api/webhook(.*)'])

export default clerkMiddleware(async (auth, req: NextRequest) => {
	const { userId, orgId } = await auth()

	if (userId && isPublicRoute(req) && !req.url.includes('/api/webhook')) {
		if (orgId) {
			return NextResponse.redirect(new URL(`/organization/${orgId}`, req.url))
		}

		return NextResponse.redirect(new URL('/select-org', req.url))
	}

	if (!isPublicRoute(req)) {
		await auth.protect()
	}

	return NextResponse.next()
})

export const config = {
	matcher: [
		// Skip Next.js internals and all static files, unless found in search params
		'/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
		// Always run for API routes
		'/(api|trpc)(.*)',
	],
}
