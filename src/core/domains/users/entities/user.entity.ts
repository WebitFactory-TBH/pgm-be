import { CoreEntity } from '@common/entities/core.entity.js'
import { User } from '@prisma/client'

export class UserEntity extends CoreEntity implements User {
  firstName: string | null
  lastName: string | null
  billingAddress: string | null
  companyName: string | null
  companyRegNo: string | null
  nickname: string
}
