import { PermissionsGuard } from '@common/guards/permission.guard'
import { AuthenticationModule } from '@core/auth/authentication.module'
import { PrismaModule } from '@core/prisma/prisma.module'
import { DomainsModule } from '@domains/domains.module'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true
    }),
    PrismaModule,
    DomainsModule,
    AuthenticationModule
  ],
  providers: [
    {
      provide: 'APP_GUARD',
      useClass: PermissionsGuard
    }
  ]

})
export class AppModule {}
