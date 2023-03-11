import { ApiProperty } from '@nestjs/swagger'
import { IsJSON, IsString } from 'class-validator'

export class PaymentsDto {
  @ApiProperty({ description: 'Who will pay' })
  @IsString()
  public from: string

  @ApiProperty({ description: 'Who will receive' })
  @IsString()
  public to: string

  @ApiProperty({ description: 'The amount to be paid' })
  @IsString()
  public amount: string
}

export class CreatePaymentDto {
  @ApiProperty({ description: 'Any metadata related to the payment link' })
  @IsJSON()
  public meta: string

  @ApiProperty({ description: 'The individual payments that will be done for the payment link' })
  public payments: PaymentsDto[]
}
