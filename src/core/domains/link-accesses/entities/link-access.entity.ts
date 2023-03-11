import { CoreEntity } from '@common/entities/core.entity'
import { LinkAccess, Prisma } from '@prisma/client'

export class LinkAccessEntity extends CoreEntity implements LinkAccess {
  paymentLinkId: string
  meta: Prisma.JsonValue
  timestamp: Date
}
