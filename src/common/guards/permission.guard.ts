import { AuthenticationService } from '@core/auth/authentication.service'
import { CanActivate, ExecutionContext, Inject, Injectable, forwardRef } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Request } from 'express'

export class RequestWithWalletAddress extends Request {
  userAddress: string
  headers: Headers & {
    token: string
    signature: string
  }
}

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor (
    private readonly reflector: Reflector,
    @Inject(forwardRef(() => AuthenticationService))
    private readonly authService: AuthenticationService
  ) {}

  async canActivate (context: ExecutionContext): Promise<boolean> {
    const isPrivate = this.reflector.getAllAndOverride('isPrivate', [
      context.getHandler(),
      context.getClass()
    ])

    if (!isPrivate) return true

    const req = context.switchToHttp().getRequest() as RequestWithWalletAddress

    const token = req.headers.token
    const signature = req.headers.signature

    if (!token || !signature) return false

    try {
      const address = this.authService.verifySignature(token, signature)

      if (address) {
        req.userAddress = address
      }
    } catch (e) {
      return false
    }

    return false
  }
}
