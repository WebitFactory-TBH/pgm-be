import { Module } from '@nestjs/common'
import { LinkAccessesService } from './link-accesses.service'
import { LinkAccessesController } from './link-accesses.controller'

@Module({
  controllers: [LinkAccessesController],
  providers: [LinkAccessesService]
})
export class LinkAccessesModule {}
