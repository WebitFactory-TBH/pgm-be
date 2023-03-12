import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class CompletePaymentDto {
  @ApiProperty({ description: 'Address of the one who pays' })
  @IsString()
  public address: string

  @ApiProperty({ description: 'The payment link id' })
  @IsString()
  public paymentId: string
}
