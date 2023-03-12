import { ApiProperty } from '@nestjs/swagger'
import { IsJSON, IsString } from 'class-validator'

export class CreateLinkAccessDto {
  @ApiProperty({ description: 'Payment link ID', example: 'clf4zcgau0000ar7ljpiijhiz' })
  @IsString()
  public paymentLinkId: string

  @ApiProperty({ description: 'Any metadata related to the access', example: '{}' })
  @IsJSON()
  public meta?: string
}
