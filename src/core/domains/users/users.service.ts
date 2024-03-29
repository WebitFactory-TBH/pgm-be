import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from 'src/core/prisma/prisma.service'

export interface createUserData {
  nickname: string,
  firstName?: string,
  lastName?: string,
  billingAddress?: string,
  companyName?: string,
  companyRegNo?: string
}

@Injectable()
export class UsersService {
  constructor (private prisma: PrismaService) {}

  async create (data: createUserData) {
    const { nickname, firstName, lastName, billingAddress, companyName, companyRegNo } = data
    return await this.prisma.user.create({
      data: {
        nickname,
        firstName,
        lastName,
        billingAddress,
        companyName,
        companyRegNo
      }
    })
  }

  async findUserByNickname (nickname: string) {
    return await this.prisma.user.findUnique({
      where: {
        nickname
      }
    })
  }

  async getPaymentOfUserWithWallet (walletAddress: string) {
    return await this.prisma.paymentLink.findMany({
      where: {
        creatorWallet: {
          address: walletAddress
        }
      },
      include: {
        payments: true,
        linkAccesses: true
      }
    })
  }

  async findUserByWalletAddress (walletAddress: string) {
    return await this.prisma.user.findFirst({
      where: {
        wallets: {
          some: {
            address: walletAddress
          }
        }
      },
      include: {
        wallets: true
      }
    })
  }

  async findAll () {
    return await this.prisma.user.findMany()
  }

  async findOne (id: string) {
    return await this.prisma.user.findUnique({
      where: {
        id
      }
    })
  }

  async updateUserByWalletAddress (walletAddress: string, data: Prisma.UserUncheckedUpdateInput) {
    const user = await this.findUserByWalletAddress(walletAddress)

    return await this.prisma.user.update({
      where: {
        id: user.id
      },
      data
    })
  }

  async update (id: string, data: Prisma.UserUncheckedUpdateInput) {
    return await this.prisma.user.update({
      where: {
        id
      },
      data
    })
  }

  async remove (id: string) {
    return await this.prisma.user.delete({
      where: {
        id
      }
    })
  }
}
