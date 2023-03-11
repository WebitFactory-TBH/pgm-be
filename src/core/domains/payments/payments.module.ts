import { PrismaModule } from '@core/prisma/prisma.module'
import { Module } from '@nestjs/common'
import { PaymentsController } from './payments.controller'
import { PaymentsService } from './payments.service'

@Module({
  controllers: [PaymentsController],
  providers: [PaymentsService],
  imports: [PrismaModule]
})
export class PaymentsModule {}
