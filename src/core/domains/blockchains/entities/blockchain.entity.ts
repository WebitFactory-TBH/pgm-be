import { CoreEntity } from '@common/entities/core.entity'
import { Blockchain, Prisma } from '@prisma/client'

export class BlockchainEntity extends CoreEntity implements Blockchain {
  name: string
  contractABI: Prisma.JsonValue
}
