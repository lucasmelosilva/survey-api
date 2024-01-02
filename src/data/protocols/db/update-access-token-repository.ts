export interface UpdateModel {
  id: string
  accessToken: string
}

export interface UpdateAccessTokenRepository {
  updateAccessToken: (updateMode: UpdateModel) => Promise<void>
}
