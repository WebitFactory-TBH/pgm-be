import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common'
import { ApiBody, ApiOkResponse } from '@nestjs/swagger'
import { Response } from 'express'
import { AuthenticationService } from './authentication.service'
import { RequestTokenDto } from './dto/requestToken.dto'
import { VerifyTokenDto } from './dto/verifyToken.dto'
import { InvalidTokenException } from './exceptions/InvalidToken.exception'
import { TokenExpiredException } from './exceptions/TokenExpired.exception'

@Controller('authentication')
export class AuthenticationController {
  constructor (private readonly authenticationService: AuthenticationService) {
  }

  @ApiOkResponse({ description: 'Token successfully generated' })
  @ApiBody({ type: RequestTokenDto })
  @Post('requestToken')
  async requestToken (
    @Body() requestTokenDto: RequestTokenDto
  ) {
    return this.authenticationService.generateToken(requestTokenDto.walletAddress)
  }

  @ApiOkResponse({ description: 'Token successfully verified' })
  @ApiBody({ type: VerifyTokenDto })
  @Post('verifyToken')
  async verifyToken (
    @Body() verifyTokenDto: VerifyTokenDto,
    @Res() response: Response
  ) {
    try {
      const address = this.authenticationService.verifySignature(verifyTokenDto.signature, verifyTokenDto.token)

      if (address) {
        return response.status(HttpStatus.OK).json({ address })
      }
    } catch (e) {
      switch (e) {
      case InvalidTokenException:
        return response.status(HttpStatus.UNAUTHORIZED).json({ error: 'Invalid token' })
      case TokenExpiredException:
        return response.status(HttpStatus.UNAUTHORIZED).json({ error: 'Token expired' })
      default:
        return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' })
      }
    }
  }
}
