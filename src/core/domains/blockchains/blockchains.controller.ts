import { Controller, Get } from '@nestjs/common'
import { ApiOkResponse } from '@nestjs/swagger'
import { BlockchainsService } from './blockchains.service'

@Controller('blockchains')
export class BlockchainsController {
  constructor (private readonly blockchainsService: BlockchainsService) {}

  @ApiOkResponse({ description: 'Returned all blockchains (and associated chains)' })
  @Get('all')
  async getBlockchains () {
    return await this.blockchainsService.getBlockChainsAndChains()
  }
}
