/* istanbul ignore file */
export interface Encrypter {
  encrypt: (value: string) => Promise<string>
}
