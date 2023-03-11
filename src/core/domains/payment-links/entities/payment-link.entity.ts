import { CoreEntity } from '@common/entities/core.entity'
import { PaymentLink, Prisma } from '@prisma/client'

export class PaymentLinkEntity extends CoreEntity implements PaymentLink {
  metadata: Prisma.JsonValue
  walletId: string
  status: string
}
