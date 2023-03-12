import { Private } from '@common/decorators/isPrivate.decorator'
import { WalletsService } from '@domains/wallets/wallets.service'
import { Body, Controller, Post, Req } from '@nestjs/common'
import { ApiBearerAuth, ApiBody, ApiOkResponse } from '@nestjs/swagger'
import { Request } from 'express'
import { CancelPaymentDto } from './dto/cancelPayment.dto'
import { CompletePaymentDto } from './dto/completePayment.dto'
import { CreatePaymentDto } from './dto/createPayment.dto'
import { GetPaymentDto } from './dto/getPayment.dto'
import { PaymentLinksService } from './payment-links.service'

@Controller('payment-links')
export class PaymentLinksController {
  constructor (private readonly paymentLinksService: PaymentLinksService, private readonly walletsService: WalletsService) {}

  @ApiOkResponse({ description: 'Created an entry for the payment link' })
  @ApiBearerAuth()
  @ApiBody({ type: CreatePaymentDto })
  @Post('create')
  @Private()
  async createPayment (@Body() paymentLinkDto: CreatePaymentDto,
  @Req() request: Request) {
    const walletAddress = (request as any).userAddress

    const wallet = await this.walletsService.findWalletByAddress(walletAddress)

    return await this.paymentLinksService.create({
      walletId: wallet.id,
      metadata: paymentLinkDto.meta,
      payments: paymentLinkDto.payments
    })
  }

  @ApiOkResponse({ description: 'Payment completed' })
  @ApiBody({ type: CompletePaymentDto })
  @Post('complete')
  async completePayment (@Body() completePaymentDto: CompletePaymentDto) {
    return await this.paymentLinksService.completePayment(completePaymentDto)
  }

  @ApiOkResponse({ description: 'Payment cancelled' })
  @ApiBearerAuth()
  @ApiBody({ type: CancelPaymentDto })
  @Post('cancel')
  @Private()
  async cancelPayment (@Body() cancelPaymentDto: CancelPaymentDto) {
    return await this.paymentLinksService.cancelPayment(cancelPaymentDto.paymentId)
  }

  @ApiOkResponse({ description: 'All payment data' })
  @ApiBody({ type: GetPaymentDto })
  @Post('data')
  async getPaymentData (@Body() getPaymentDto: GetPaymentDto) {
    return await this.paymentLinksService.getData(getPaymentDto.paymentId)
  }
}
