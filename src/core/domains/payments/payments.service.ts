import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from 'src/core/prisma/prisma.service'

@Injectable()
export class PaymentsService {
  constructor (private prisma: PrismaService) {}

  async create (paymentLinkId: string, from: string, to: string, amount: string, timestamp?: Date) {
    return await this.prisma.payment.create({
      data: {
        paymentLink: {
          connect: {
            id: paymentLinkId
          }
        },
        from,
        to,
        amount,
        timestamp
      }
    })
  }

  async findAll () {
    return await this.prisma.payment.findMany()
  }

  async findOne (id: string) {
    return await this.prisma.payment.findUnique({
      where: {
        id
      }
    })
  }

  async update (id: string, data: Prisma.PaymentUncheckedUpdateInput) {
    return await this.prisma.payment.update({
      where: {
        id
      },
      data
    })
  }

  async remove (id: string) {
    return await this.prisma.payment.delete({
      where: {
        id
      }
    })
  }
}
