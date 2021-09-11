import jwtDecode from 'jwt-decode'
import { RefreshTokenRequest } from '../proto/auth_pb'
import { authService } from '../services'
import { atom, selector, setAtomValue } from 'yauk'
import { store } from './store'
import { getAtomValue } from './util'

export interface JWT {
  user_id: string
  is_admin: boolean
  team: string
  exp: number
  iat: number
  iss: string
}

export const authTokens = atom(async () => {
  const refreshToken = localStorage.getItem('refreshToken') ?? ''

  if (refreshToken === '') {
    return {
      refreshToken: '',
      accessToken: '',
    }
  }

  const req = new RefreshTokenRequest().setToken(refreshToken)
  const res = await authService.refreshToken(req, null)
  const accessToken = res.getToken()

  return {
    refreshToken,
    accessToken,
  }
})

export const isLoggedIn = selector((get) => {
  const tokens = get(authTokens)
  return tokens.refreshToken !== ''
})

export const authClaims = selector((get) => {
  const tokens = get(authTokens)
  if (tokens.accessToken === '') return null

  return jwtDecode<JWT>(tokens.accessToken)
})

export const login = (refreshToken: string, accessToken: string) => {
  localStorage.setItem('refreshToken', refreshToken)
  setAtomValue(store, authTokens, {
    refreshToken,
    accessToken,
  })
}

export const logout = () => {
  localStorage.removeItem('refreshToken')
  setAtomValue(store, authTokens, {
    refreshToken: '',
    accessToken: '',
  })
}

export const getNewToken = async (refreshToken: string): Promise<string> => {
  const req = new RefreshTokenRequest().setToken(refreshToken)
  const res = await authService.refreshToken(req, null)
  const accessToken = res.getToken()

  setAtomValue(store, authTokens, {
    refreshToken,
    accessToken,
  })

  return accessToken
}

export const getAccessToken = async (): Promise<string> => {
  const { refreshToken, accessToken } = await getAtomValue(store, authTokens)

  if (refreshToken === '') {
    return ''
  }

  if (accessToken === '') {
    return getNewToken(refreshToken)
  }

  const claims = jwtDecode<JWT>(accessToken)
  if (claims.exp - 300 < new Date().getTime() / 1000) {
    return getNewToken(refreshToken)
  }

  return accessToken
}

export const getClaims = async (): Promise<JWT | null> => {
  const accessToken = await getAccessToken()
  if (accessToken === '') return null

  return jwtDecode<JWT>(accessToken)
}

export const newToken = async (): Promise<void> => {
  const tokens = await getAtomValue(store, authTokens)
  await getNewToken(tokens.refreshToken)
}

export const refreshToken = async (): Promise<void> => {
  await getAccessToken()
}
