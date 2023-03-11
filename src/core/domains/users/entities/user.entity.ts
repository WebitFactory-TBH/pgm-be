import { CoreEntity } from '@common/entities/core.entity.js'
import { User } from '@prisma/client'

export class UserEntity extends CoreEntity implements User {
  nickname: string
}
