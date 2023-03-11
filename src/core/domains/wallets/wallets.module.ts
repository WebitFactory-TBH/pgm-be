import { PrismaModule } from '@core/prisma/prisma.module'
import { Module } from '@nestjs/common'
import { WalletsController } from './wallets.controller'
import { WalletsService } from './wallets.service'

@Module({
  controllers: [WalletsController],
  providers: [WalletsService],
  imports: [PrismaModule]
})
export class WalletsModule {}
