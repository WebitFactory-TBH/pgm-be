import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class RequestTokenDto {
  @IsString()
  @ApiProperty({ type: String, description: 'The wallet address', example: '0x1234567890abcdef1234567890abcdef12345678' })
  public walletAddress: string
}
