import { CoreEntity } from '@common/entities/core.entity'
import { PaymentLink } from '@prisma/client'

export class PaymentLinkEntity extends CoreEntity implements PaymentLink {
  walletId: string
  status: string
}
