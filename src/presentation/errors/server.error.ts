export class ServerError extends Error {
  constructor () {
    super('Server error')
    super.name = 'ServerError'
  }
}
