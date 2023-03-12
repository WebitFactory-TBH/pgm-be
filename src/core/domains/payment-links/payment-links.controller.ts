import { Private } from '@common/decorators/isPrivate.decorator'
import { RequestWithWalletAddress } from '@common/guards/permission.guard'
import { WalletsService } from '@domains/wallets/wallets.service'
import { Body, Controller, Post, Req } from '@nestjs/common'
import { ApiBearerAuth, ApiBody, ApiOkResponse } from '@nestjs/swagger'
import { CreatePaymentDto } from './dto/createPayment.dto'
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
  @Req() request: RequestWithWalletAddress) {
    const walletAddress = request.userAddress

    const wallet = await this.walletsService.findWalletByAddress(walletAddress)

    return await this.paymentLinksService.create({
      walletId: wallet.id,
      metadata: paymentLinkDto.meta,
      payments: paymentLinkDto.payments
    })
  }
}
