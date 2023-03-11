import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from 'src/core/prisma/prisma.service'

@Injectable()
export class UsersService {
  constructor (private prisma: PrismaService) {}

  async create (nickname: string) {
    return await this.prisma.user.create({
      data: {
        nickname
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
