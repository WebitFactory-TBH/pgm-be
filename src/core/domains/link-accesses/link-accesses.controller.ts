import { Body, Controller, Post, Res } from '@nestjs/common'
import { ApiBody, ApiOkResponse } from '@nestjs/swagger'
import { Response } from 'express'
import { CreateLinkAccessDto } from './dto/createLinkAccess.dto'
import { LinkAccessesService } from './link-accesses.service'

@Controller('link-accesses')
export class LinkAccessesController {
  constructor (private readonly linkAccessesService: LinkAccessesService) {}

  @ApiOkResponse({ description: 'Log access to payment link' })
  @Post('createLog')
  @ApiBody({ type: CreateLinkAccessDto })
  async createLog (@Body() linkAccessDto: CreateLinkAccessDto, @Res() response: Response) {
    try {
      const timestamp = new Date()
      const log = await this.linkAccessesService.create(linkAccessDto.paymentLinkId, timestamp, linkAccessDto.meta)

      if (log) {
        return response.status(200).json({ message: `Log created for payment link ${linkAccessDto.paymentLinkId}` })
      }
    } catch (e) {
      return response.status(500).json({ error: 'Internal server error' })
    }

    return response.status(500).json({ error: 'Internal server error' })
  }
}
