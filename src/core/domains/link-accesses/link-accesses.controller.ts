import { Controller } from '@nestjs/common'
import { LinkAccessesService } from './link-accesses.service'

@Controller('link-accesses')
export class LinkAccessesController {
  constructor (private readonly linkAccessesService: LinkAccessesService) {}
}
