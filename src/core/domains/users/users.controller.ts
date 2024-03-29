import { Private } from '@common/decorators/isPrivate.decorator'
import { WalletsService } from '@domains/wallets/wallets.service'
import { Body, Controller, Get, HttpStatus, Post, Req, Res } from '@nestjs/common'
import { ApiBearerAuth, ApiBody, ApiOkResponse } from '@nestjs/swagger'
import { Prisma } from '@prisma/client'
import { Request, Response } from 'express'
import { LinkWalletDto } from './dto/linkWallet.dto'
import { UpdateUserDto } from './dto/updateUser.dto'
import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
  constructor (private readonly usersService: UsersService, private readonly walletsService: WalletsService) {}

  @ApiOkResponse({ description: 'The user data' })
  @ApiBearerAuth()
  @Get('data')
  @Private()
  async getUserData (
  @Req() request: Request, @Res() response: Response) {
    const walletAddress = (request as any).userAddress

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
    @Req() request: Request,
    @Res() response: Response) {
    const walletAddress = (request as any).userAddress

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

  @ApiOkResponse({ description: 'All the payments created by the user' })
  @ApiBearerAuth()
  @Get('payments')
  @Private()
  async getPayments (
    @Req() request: Request,
    @Res() response: Response) {
    const walletAddress = (request as any).userAddress

    try {
      const payments = await this.usersService.getPaymentOfUserWithWallet(walletAddress)

      return response.status(HttpStatus.OK).json(payments)
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        switch (e.code) {
        case 'P2002':
          return response.status(HttpStatus.NOT_FOUND).json({ error: 'The user doesn\'t own the wallet used for authentication' })
        }
      }
    }

    return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: 'An error occurred' })
  }

  @ApiOkResponse({ description: 'User updated' })
  @ApiBearerAuth()
  @Post('update')
  @ApiBody({ type: UpdateUserDto })
  @Private()
  async updateUser (
    @Body() updateUserDto: UpdateUserDto,
    @Req() request: Request,
    @Res() response: Response) {
    const walletAddress = (request as any).userAddress

    try {
      const user = await this.usersService.updateUserByWalletAddress(walletAddress, updateUserDto)

      return response.status(HttpStatus.OK).json(user)
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        switch (e.code) {
        case 'P2002':
          return response.status(HttpStatus.NOT_FOUND).json({ error: 'The user doesn\'t own the wallet used for authentication' })
        }
      }
    }

    return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: 'An error occurred' })
  }
}
