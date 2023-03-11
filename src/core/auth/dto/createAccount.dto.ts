import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, IsString } from 'class-validator'

export class CreateAccountDto {
  @IsString()
  @ApiProperty({ type: String, description: 'The encrypted token' })
  public token: string

  @IsString()
  @ApiProperty({ type: String, description: 'The hash created by signing the token with the wallet\'s private key', example: '0x1234567890abcdef1234567890abcdef12345678' })
  public signature: string

  @IsString()
  @ApiProperty({ type: String, description: 'User nickname', example: 'johndoe' })
  public nickname: string

  @IsString()
  @ApiProperty({ type: String, description: 'The id of the wallet used by the user', example: 'arandomuuuid' })
  public walletId: string

  @IsString()
  @ApiProperty({ type: String, description: 'The user\'s first name', example: 'John' })
  @IsOptional()
  public firstName?: string

  @IsString()
  @ApiProperty({ type: String, description: 'The user\'s last name', example: 'Doe' })
  @IsOptional()
  public lastName?: string

  @IsString()
  @ApiProperty({ type: String, description: 'The user\'s billing address', example: '221B Baker Street, London' })
  @IsOptional()
  public billingAddress?: string

  @IsString()
  @ApiProperty({ type: String, description: 'The company name', example: 'Fictional LTD' })
  @IsOptional()
  public companyName?: string

  @IsString()
  @ApiProperty({ type: String, description: 'The company registration number', example: '01234' })
  @IsOptional()
  public companyRegNo?: string
}
