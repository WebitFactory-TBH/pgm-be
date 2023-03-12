import { PaymentLinkStatus } from '@common/enums/payment-links/PaymentLinkStatus.enum'
import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from 'src/core/prisma/prisma.service'

export interface createBlockchainData {
  walletId: string,
  metadata?: string,
  payments: {
    from: string,
    to: string,
    amount: string
  }[]
}

export interface completePaymentData {
  address: string,
  paymentId: string
}

@Injectable()
export class PaymentLinksService {
  constructor (private prisma: PrismaService) {}

  async create (data: createBlockchainData) {
    return await this.prisma.paymentLink.create({
      data: {
        creatorWallet: {
          connect: {
            id: data.walletId
          }
        },
        metadata: data.metadata,
        status: 'PENDING',
        payments: {
          create: data.payments
        }
      }
    })
  }

  async completePayment (data: completePaymentData) {
    const { address, paymentId } = data

    const paymentLink = await this.prisma.paymentLink.update({
      where: {
        id: paymentId
      },
      data: {
        status: PaymentLinkStatus.COMPLETED
      },
      include: {
        payments: true
      }
    })

    await Promise.all(paymentLink.payments.map(async payment => {
      await this.prisma.payment.update({
        where: {
          id: payment.id
        },
        data: {
          timestamp: new Date(),
          from: address
        }
      })
    }))
  }

  async cancelPayment (paymentId: string) {
    return await this.prisma.paymentLink.update({
      where: {
        id: paymentId
      },
      data: {
        status: PaymentLinkStatus.CANCELLED
      }
    })
  }

  async findAll () {
    return await this.prisma.paymentLink.findMany()
  }

  async findOne (id: string) {
    return await this.prisma.paymentLink.findUnique({
      where: {
        id
      }
    })
  }

  async update (id: string, data: Prisma.PaymentLinkUncheckedUpdateInput) {
    return await this.prisma.paymentLink.update({
      where: {
        id
      },
      data
    })
  }

  async remove (id: string) {
    return await this.prisma.paymentLink.delete({
      where: {
        id
      }
    })
  }
}
