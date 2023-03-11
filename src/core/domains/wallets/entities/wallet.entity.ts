import { CoreEntity } from '@common/entities/core.entity'
import { Wallet } from '@prisma/client'

export class WalletEntity extends CoreEntity implements Wallet {
  userId: string
  address: string
}
