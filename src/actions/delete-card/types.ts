import { z } from 'zod'

import { Card } from '@/generated/prisma/client'
import { ActionState } from '@/lib/create-safe-action'
import { DeleteCard } from '@/actions/delete-card/schema'

export type InputType = z.infer<typeof DeleteCard>
export type ReturnType = ActionState<InputType, Card>
