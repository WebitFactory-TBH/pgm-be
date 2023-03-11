import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from 'src/core/prisma/prisma.service'

@Injectable()
export class ChainsService {
  constructor (private prisma: PrismaService) {}

  async create (blockchainId: string, name: string, contractAddress: string, metadata?:string) {
    return await this.prisma.chain.create({
      data: {
        name,
        blockchain: {
          connect: {
            id: blockchainId
          }
        },
        contractAddress,
        metadata
      }
    })
  }

  async findAll () {
    return await this.prisma.chain.findMany()
  }

  async findOne (id: string) {
    return await this.prisma.chain.findUnique({
      where: {
        id
      }
    })
  }

  async update (id: string, data: Prisma.ChainUncheckedUpdateInput) {
    return await this.prisma.chain.update({
      where: {
        id
      },
      data
    })
  }

  async remove (id: string) {
    return await this.prisma.chain.delete({
      where: {
        id
      }
    })
  }
}
