import { CoreEntity } from '@common/entities/core.entity'
import { Chain, Prisma } from '@prisma/client'

export class ChainEntity extends CoreEntity implements Chain {
  name: string
  metadata: Prisma.JsonValue
  blockchainId: string
  contractAddress: string
}
