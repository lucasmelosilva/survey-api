export interface UpdateModel {
  id: string
  accessToken: string
}

export interface UpdateAccessTokenRepository {
  update: (updateMode: UpdateModel) => Promise<void>
}
