export class ServerError extends Error {
  constructor (
    readonly stack: string
  ) {
    super('Server error')
    super.name = 'ServerError'
  }
}
