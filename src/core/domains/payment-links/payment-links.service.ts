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
