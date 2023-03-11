import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PaymentLinkStatus } from 'src/common/enums/payment-links/PaymentLinkStatus.enum'
import { PrismaService } from 'src/core/prisma/prisma.service'

@Injectable()
export class PaymentLinksService {
  constructor (private prisma: PrismaService) {}

  async create (walletId: string, status: PaymentLinkStatus) {
    return await this.prisma.paymentLink.create({
      data: {
        creatorWallet: {
          connect: {
            id: walletId
          }
        },
        status
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
