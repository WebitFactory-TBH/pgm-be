import { AuthenticationModule } from '@core/auth/authentication.module'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_GUARD } from '@nestjs/core'
import { PermissionsGuard } from './guards/permission.guard'

@Module({
  imports: [ConfigModule, AuthenticationModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: PermissionsGuard
    }
  ]
})
export class CommonModule {}
