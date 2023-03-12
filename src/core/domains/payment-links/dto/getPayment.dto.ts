import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class GetPaymentDto {
  @ApiProperty({ description: 'The payment link id' })
  @IsString()
  public paymentId: string
}
