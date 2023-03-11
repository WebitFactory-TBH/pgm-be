import { PrismaModule } from '@core/prisma/prisma.module'
import { Module } from '@nestjs/common'
import { LinkAccessesController } from './link-accesses.controller'
import { LinkAccessesService } from './link-accesses.service'

@Module({
  controllers: [LinkAccessesController],
  providers: [LinkAccessesService],
  imports: [PrismaModule]
})
export class LinkAccessesModule {}
