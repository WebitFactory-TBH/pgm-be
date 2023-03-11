import { PrismaModule } from '@core/prisma/prisma.module'
import { Module } from '@nestjs/common'
import { ChainsController } from './chains.controller'
import { ChainsService } from './chains.service'

@Module({
  controllers: [ChainsController],
  providers: [ChainsService],
  imports: [PrismaModule]
})
export class ChainsModule {}
