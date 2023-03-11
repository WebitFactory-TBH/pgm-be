import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { DomainsModule } from './core/domains/domains.module'
import { PrismaModule } from './core/prisma/prisma.module'

@Module({
  imports: [
    PrismaModule,
    DomainsModule,
    ConfigModule.forRoot()
  ]
})
export class AppModule {}
