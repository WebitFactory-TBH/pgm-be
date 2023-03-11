import { Module } from '@nestjs/common'
import { PrismaModule } from '../../prisma/prisma.module'
import { UserService } from './user.service'

@Module({
  providers: [UserService],
  imports: [PrismaModule]
})
export class UserModule {}