import { User } from '@prisma/client'

export class UserEntity implements User {
  nickname: string
  id: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
}
