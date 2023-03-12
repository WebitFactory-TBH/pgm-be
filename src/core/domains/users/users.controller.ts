import { Private } from '@common/decorators/isPrivate.decorator'
import { RequestWithWalletAddress } from '@common/guards/permission.guard'
import { WalletsService } from '@domains/wallets/wallets.service'
import { Body, Controller, Get, HttpStatus, Post, Req, Res } from '@nestjs/common'
import { ApiBearerAuth, ApiBody, ApiOkResponse } from '@nestjs/swagger'
import { Prisma } from '@prisma/client'
import { Response } from 'express'
import { LinkWalletDto } from './dto/linkWallet.dto'
import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
  constructor (private readonly usersService: UsersService, private readonly walletsService: WalletsService) {}

  @ApiOkResponse({ description: 'The user data' })
  @ApiBearerAuth()
  @Get('data')
  @Private()
  async getUserData (
  @Req() request: RequestWithWalletAddress, @Res() response: Response) {
    const walletAddress = request.userAddress

    try {
      const user = await this.usersService.findUserByWalletAddress(walletAddress)

      return response.status(HttpStatus.OK).json(user)
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        switch (e.code) {
        case 'P2002':
          return response.status(HttpStatus.NOT_FOUND).json({ error: 'The user doesn\'t own the wallet used for authentication' })
        }
      }
    }
  }

  @ApiOkResponse({ description: 'Linked the wallet to the user' })
  @ApiBearerAuth()
  @ApiBody({ type: LinkWalletDto })
  @Post('link-wallet')
  @Private()
  async linkWallet (
    @Body() linkWalletDto: LinkWalletDto,
    @Req() request: RequestWithWalletAddress,
    @Res() response: Response) {
    const walletAddress = request.userAddress

    try {
      const wallet = await this.walletsService.create({
        address: walletAddress,
        chainId: linkWalletDto.chainId,
        userId: linkWalletDto.userId
      })

      return response.status(HttpStatus.OK).json(wallet)
    } catch (e) {
      console.error(e)
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        switch (e.code) {
        case 'P2002':
          return response.status(HttpStatus.NOT_FOUND).json({ error: 'The user or chain doesn\'t exist' })
        }
      }
    }

    return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: 'An error occurred' })
  }
}
