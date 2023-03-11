import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from 'src/core/prisma/prisma.service'

export interface createBlockchainData {
  name: string,
  contractABI: string
}

@Injectable()
export class BlockchainsService {
  constructor (private prisma: PrismaService) {}

  async create (data: createBlockchainData) {
    const { name, contractABI } = data

    return await this.prisma.blockchain.create({
      data: {
        name,
        contractABI
      }
    })
  }

  async findAll () {
    return await this.prisma.blockchain.findMany()
  }

  async getBlockChainsAndChains () {
    return await this.prisma.blockchain.findMany({
      include: {
        chains: true
      }
    })
  }

  async findOne (id: string) {
    return await this.prisma.blockchain.findUnique({
      where: {
        id
      }
    })
  }

  async update (id: string, data: Prisma.BlockchainUncheckedUpdateInput) {
    return await this.prisma.blockchain.update({
      where: {
        id
      },
      data
    })
  }

  async remove (id: string) {
    return await this.prisma.blockchain.delete({
      where: {
        id
      }
    })
  }
}
