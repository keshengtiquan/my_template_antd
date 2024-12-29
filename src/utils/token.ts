const ACCESS_TOKEN_KEY = "accessToken"
const REFRESH_Token = "refreshToken"

const getAccessToken = () => {
  return localStorage.getItem(ACCESS_TOKEN_KEY)
}

const setAccessToken = (token: string) => {
  localStorage.setItem(ACCESS_TOKEN_KEY, token)
}

const clearAccessToken = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY)
}

const getRefreshToken = () => {
  return localStorage.getItem(REFRESH_Token)
}

const setRefreshToken = (token: string) => {
  localStorage.setItem(REFRESH_Token, token)
}

const clearRefreshTokenn = () => {
  localStorage.removeItem(REFRESH_Token)
}

export { getAccessToken, setAccessToken, clearAccessToken, getRefreshToken, setRefreshToken, clearRefreshTokenn }
