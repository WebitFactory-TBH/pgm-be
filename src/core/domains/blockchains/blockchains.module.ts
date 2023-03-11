import { PrismaModule } from '@core/prisma/prisma.module'
import { Module } from '@nestjs/common'
import { BlockchainsController } from './blockchains.controller'
import { BlockchainsService } from './blockchains.service'

@Module({
  controllers: [BlockchainsController],
  providers: [BlockchainsService],
  imports: [PrismaModule]
})
export class BlockchainsModule {}
