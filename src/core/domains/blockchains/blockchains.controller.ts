import { Controller } from '@nestjs/common'
import { BlockchainsService } from './blockchains.service'

@Controller('blockchains')
export class BlockchainsController {
  constructor (private readonly blockchainsService: BlockchainsService) {}
}
