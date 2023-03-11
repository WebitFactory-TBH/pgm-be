import { CoreEntity } from '@common/entities/core.entity'
import { Payment } from '@prisma/client'

export class PaymentEntity extends CoreEntity implements Payment {
  paymentLinkId: string
  from: string
  to: string
  amount: string
  timestamp: Date
}
