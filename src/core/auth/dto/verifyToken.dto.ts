import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class VerifyTokenDto {
  @IsString()
  @ApiProperty({ type: String, description: 'The encrypted token' })
  public token: string

  @IsString()
  @ApiProperty({ type: String, description: 'The hash created by signing the token with the wallet\'s private key', example: '0x1234567890abcdef1234567890abcdef12345678' })
  public signature: string
}
