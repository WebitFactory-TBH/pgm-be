
import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsString, MinLength } from 'class-validator'

export class CreateProfileInput {
  @MinLength(1)
  @ApiProperty()
    bio: string
}

export class CreateUserInput {
  @IsString()
  @MinLength(3)
  @ApiProperty()
    name: string

  @IsEmail()
  @ApiProperty()
    email: string

  @ApiProperty({ required: false })
    profile?: CreateProfileInput
}
