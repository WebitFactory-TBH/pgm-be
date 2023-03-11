import { UsersModule } from '@domains/users/users.module'
import { Module } from '@nestjs/common'
import { AuthenticationController } from './authentication.controller'
import { AuthenticationService } from './authentication.service'

@Module({
  controllers: [AuthenticationController],
  providers: [AuthenticationService],
  imports: [UsersModule],
  exports: [AuthenticationService]
})
export class AuthenticationModule {}
