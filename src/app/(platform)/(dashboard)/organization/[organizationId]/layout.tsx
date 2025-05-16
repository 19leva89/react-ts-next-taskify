import { startCase } from 'lodash'
import { PropsWithChildren } from 'react'
import { auth } from '@clerk/nextjs/server'

import { OrgControl } from '@/app/(platform)/(dashboard)/organization/[organizationId]/_components/org-control'

export const generateMetadata = async () => {
	const { orgSlug } = await auth()

	return { title: startCase(orgSlug || 'organization') }
}

const OrganizationIdLayout = ({ children }: PropsWithChildren) => {
	return (
		<>
			<OrgControl />

			{children}
		</>
	)
}

export default OrganizationIdLayout
