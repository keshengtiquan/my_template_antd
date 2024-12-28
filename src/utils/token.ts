const TOKEN_KEY = "token"

const getToken = () => {
  return localStorage.getItem("token")
}

const setToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token)
}

const clearToken = () => {
  localStorage.removeItem(TOKEN_KEY)
}

export { getToken, setToken, clearToken }
