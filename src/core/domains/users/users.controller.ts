import { Private } from '@common/decorators/isPrivate.decorator'
import { RequestWithWalletAddress } from '@common/guards/permission.guard'
import { WalletsService } from '@domains/wallets/wallets.service'
import { Controller, Get, HttpStatus, Req, Res } from '@nestjs/common'
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger'
import { Prisma } from '@prisma/client'
import { Response } from 'express'
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
}
