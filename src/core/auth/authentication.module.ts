import { UsersModule } from '@domains/users/users.module'
import { WalletsModule } from '@domains/wallets/wallets.module'
import { Module } from '@nestjs/common'
import { AuthenticationController } from './authentication.controller'
import { AuthenticationService } from './authentication.service'

@Module({
  controllers: [AuthenticationController],
  providers: [AuthenticationService],
  imports: [UsersModule, WalletsModule],
  exports: [AuthenticationService]
})
export class AuthenticationModule {}
