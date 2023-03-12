import { Private } from '@common/decorators/isPrivate.decorator'
import { Body, Controller, HttpStatus, Post, Req, Res } from '@nestjs/common'
import { ApiBearerAuth, ApiBody, ApiOkResponse } from '@nestjs/swagger'
import { Prisma, Wallet } from '@prisma/client'
import { Request, Response } from 'express'
import { LinkChainDto } from './dto/linkChain.dto'
import { WalletsService } from './wallets.service'

@Controller('wallets')
export class WalletsController {
  constructor (private readonly walletsService: WalletsService) {}

  @ApiOkResponse({ description: 'Wallet can now be used on another chain' })
  @ApiBearerAuth()
  @ApiBody({ type: LinkChainDto })
  @Post('link-chain')
  @Private()
  async linkWallet (
    @Body() linkChainDto: LinkChainDto,
    @Req() request: Request,
    @Res() response: Response
  ) {
    const walletAddress = (request as any).userAddress

    let wallet: Wallet

    try {
      wallet = await this.walletsService.findWalletByAddress(walletAddress)
    } catch (e) {
      return response.status(HttpStatus.NOT_FOUND).json({ error: 'The wallet doesn\'t exist' })
    }

    try {
      await this.walletsService.linkChain({
        walletId: walletAddress,
        chainId: linkChainDto.chainId
      })

      return response.status(HttpStatus.OK).json(wallet)
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        switch (e.code) {
        case 'P2002':
          return response.status(HttpStatus.NOT_FOUND).json({ error: 'The wallet or chain doesn\'t exist' })
        case 'P2003':
          return response.status(HttpStatus.CONFLICT).json({ error: 'The wallet is already linked to the chain' })
        }
      }

      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: 'An error occurred' })
    }
  }
}
