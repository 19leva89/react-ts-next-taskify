import { z } from 'zod'

import { List } from '@/generated/prisma/client'
import { CopyList } from '@/actions/copy-list/schema'
import { ActionState } from '@/lib/create-safe-action'

export type InputType = z.infer<typeof CopyList>
export type ReturnType = ActionState<InputType, List>
