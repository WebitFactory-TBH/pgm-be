import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from 'src/core/prisma/prisma.service'

@Injectable()
export class LinkAccessesService {
  constructor (private prisma: PrismaService) {}

  async create (paymentLinkId: string, timestamp: Date, meta?: string) {
    return await this.prisma.linkAccess.create({
      data: {
        paymentLink: {
          connect: {
            id: paymentLinkId
          }
        },
        timestamp,
        meta
      }
    })
  }

  async findAll () {
    return await this.prisma.linkAccess.findMany()
  }

  async findOne (id: string) {
    return await this.prisma.linkAccess.findUnique({
      where: {
        id
      }
    })
  }

  async update (id: string, data: Prisma.LinkAccessUncheckedUpdateInput) {
    return await this.prisma.linkAccess.update({
      where: {
        id
      },
      data
    })
  }

  async remove (id: string) {
    return await this.prisma.linkAccess.delete({
      where: {
        id
      }
    })
  }
}
