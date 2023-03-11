import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from 'src/core/prisma/prisma.service'

export interface CreateWalletData {
  userId: string
  chainId: string
  address: string
}

@Injectable()
export class WalletsService {
  constructor (private prisma: PrismaService) {}

  async create (data: CreateWalletData) {
    const { userId, chainId, address } = data
    return await this.prisma.wallet.create({
      data: {
        address,
        owner: {
          connect: {
            id: userId
          }
        },
        chains: {
          connect: {
            id: chainId
          }
        }
      }
    })
  }

  async findAll () {
    return await this.prisma.wallet.findMany()
  }

  async findWalletByAddress (address: string) {
    return await this.prisma.wallet.findUnique({
      where: {
        address
      }
    })
  }

  async findOne (id: string) {
    return await this.prisma.wallet.findUnique({
      where: {
        id
      }
    })
  }

  async update (id: string, data: Prisma.WalletUncheckedUpdateInput) {
    return await this.prisma.wallet.update({
      where: {
        id
      },
      data
    })
  }

  async remove (id: string) {
    return await this.prisma.wallet.delete({
      where: {
        id
      }
    })
  }
}
