import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import * as crypto from 'crypto'
import ms from 'ms'
import { AuthenticationEntity } from './entities/authentication.entity'
import { InvalidTokenException } from './exceptions/InvalidToken.exception'
import { TokenExpiredException } from './exceptions/TokenExpired.exception'

const VALID_FOR = '1d'
const algorithm = 'aes-256-cbc'

@Injectable()
export class AuthenticationService {
  private secretKey:string
  private iv:string

  constructor (private config: ConfigService) {
    this.secretKey = this.config.get('ENCRYPTION_KEY')
    this.iv = this.secretKey.substring(0, 16)
  }

  public generateToken (address: string) {
    const timestamp = new Date()
    const data = { address, timestamp, validFor: VALID_FOR }
    return this.encrypt(data)
  }

  public verifySignature (signature: string, token: string) {
    const data = this.decrypt(token)

    if (!data.address || !data.timestamp || !data.validFor) {
      throw InvalidTokenException
    }

    const timestamp = new Date(data.timestamp)

    if (timestamp.getTime() + ms(data.validFor) <= new Date().getTime()) {
      throw TokenExpiredException
    }

    if (!this.checkSignature(signature, token, data.address)) {
      throw InvalidTokenException
    }

    return data.address
  }

  private checkSignature (signature: string, token: string, address: string) {
    // TODO: Implement signature check
    return true
  }

  private encrypt (data: AuthenticationEntity): string {
    // TODO: Implement token encryption
    const token = JSON.stringify(data)

    const encryptor = crypto.createCipheriv(algorithm, this.secretKey, this.iv)
    return encryptor.update(token, 'utf8', 'base64') + encryptor.final('base64')
  }

  private decrypt (token: string): AuthenticationEntity {
    const decryptor = crypto.createDecipheriv(algorithm, this.secretKey, this.iv)
    return JSON.parse(decryptor.update(token, 'base64', 'utf8') + decryptor.final('utf8'))
  }
}
