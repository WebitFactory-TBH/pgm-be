const ERROR_CODE = 'The token is invalid.'

export class InvalidTokenException extends Error {
  constructor () {
    super(ERROR_CODE)
  }
}
