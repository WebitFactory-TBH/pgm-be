import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, IsString } from 'class-validator'

export class UpdateUserDto {
  @ApiProperty({ description: 'The nickname of the user' })
  @IsString()
  public nickname: string

  @ApiProperty({ description: 'The first name of the user' })
  @IsString()
  @IsOptional()
  public firstName?: string

  @ApiProperty({ description: 'The last name of the user' })
  @IsString()
  @IsOptional()
  public lastName?: string

  @ApiProperty({ description: 'The billing address of the user' })
  @IsString()
  @IsOptional()
  public billingAddress?: string

  @ApiProperty({ description: 'The company name of the user' })
  @IsString()
  @IsOptional()
  public companyName?: string

  @ApiProperty({ description: 'The company registration number of the user' })
  @IsString()
  @IsOptional()
  public companyRegNo?: string
}
