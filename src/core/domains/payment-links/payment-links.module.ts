import { PrismaModule } from '@core/prisma/prisma.module'
import { Module } from '@nestjs/common'
import { PaymentLinksController } from './payment-links.controller'
import { PaymentLinksService } from './payment-links.service'

@Module({
  controllers: [PaymentLinksController],
  providers: [PaymentLinksService],
  imports: [PrismaModule]
})
export class PaymentLinksModule {}