import { PrismaModule } from '@core/prisma/prisma.module'
import { WalletsModule } from '@domains/wallets/wallets.module'
import { Module } from '@nestjs/common'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [PrismaModule, WalletsModule],
  exports: [UsersService]
})
export class UsersModule {}
