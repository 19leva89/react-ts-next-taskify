import { PropsWithChildren } from 'react'
import { ClerkProvider } from '@clerk/nextjs'

import { Toaster } from '@/components/ui'
import { ModalProvider } from '@/components/shared/providers/modal-provider'
import { QueryProvider } from '@/components/shared/providers/query-provider'

const PlatformLayout = ({ children }: PropsWithChildren) => {
	return (
		<ClerkProvider>
			<QueryProvider>
				<Toaster position='bottom-right' expand={false} richColors />

				<ModalProvider />

				{children}
			</QueryProvider>
		</ClerkProvider>
	)
}

export default PlatformLayout
