import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class LinkChainDto {
  @ApiProperty({ description: 'The chain id (from db) the user is connected to' })
  @IsString()
  public chainId: string
}
