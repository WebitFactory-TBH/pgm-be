import { Module } from '@nestjs/common'
import { BlockchainsModule } from './blockchains/blockchains.module'
import { ChainsModule } from './chains/chains.module'
import { LinkAccessesModule } from './link-accesses/link-accesses.module'
import { PaymentLinksModule } from './payment-links/payment-links.module'
import { PaymentsModule } from './payments/payments.module'
import { UsersModule } from './users/users.module'
import { WalletsModule } from './wallets/wallets.module'
@Module({
  imports: [UsersModule, WalletsModule, ChainsModule, BlockchainsModule, PaymentLinksModule, LinkAccessesModule, PaymentsModule]
})
export class DomainsModule {}
