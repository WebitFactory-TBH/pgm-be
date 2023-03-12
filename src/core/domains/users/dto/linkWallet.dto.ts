import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class LinkWalletDto {
  @ApiProperty({ description: 'The chain id (from db) the user is connected to' })
  @IsString()
  public chainId: string

  @ApiProperty({ description: 'The user id (from db) of the current user' })
  @IsString()
  public userId: string
}
