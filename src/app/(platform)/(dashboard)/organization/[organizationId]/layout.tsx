import { auth } from '@clerk/nextjs/server'

import { startCase } from 'lodash'
import { PropsWithChildren } from 'react'
import { OrgControl } from './_components/org-control'

export const generateMetadata = async () => {
	const { orgSlug } = auth()

	return {
		title: startCase(orgSlug || 'organization'),
	}
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
