import { CommonModule } from '@common/common.module'
import { AuthenticationModule } from '@core/auth/authentication.module'
import { PrismaModule } from '@core/prisma/prisma.module'
import { WalletsModule } from '@domains/wallets/wallets.module'
import { Module } from '@nestjs/common'
import { PaymentLinksController } from './payment-links.controller'
import { PaymentLinksService } from './payment-links.service'

@Module({
  controllers: [PaymentLinksController],
  providers: [PaymentLinksService],
  imports: [PrismaModule, WalletsModule, CommonModule, AuthenticationModule],
  exports: [PaymentLinksService]
})
export class PaymentLinksModule {}
