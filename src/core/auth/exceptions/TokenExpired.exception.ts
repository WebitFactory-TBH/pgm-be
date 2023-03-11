const ERROR_CODE = 'The token has expired.'

export class TokenExpiredException extends Error {
  constructor () {
    super(ERROR_CODE)
  }
}
