import jwtDecode from 'jwt-decode'
import { atom, selector } from 'recoil'
import { AuthClient } from '../proto/AuthServiceClientPb'
import { RefreshTokenRequest } from '../proto/auth_pb'

const enableDevTools = (process.env.NODE_ENV === 'development' && (window as any).__GRPCWEB_DEVTOOLS__) || (() => {})
export const authService = new AuthClient('http://localhost:8080', null, null)

enableDevTools([authService])

export interface JWT {
  user_id: string,
  is_admin: boolean,
  team: string,
  exp: number,
  iat: number,
  iss: string,
}

export const authTokens = atom({
  key: 'auth_tokens',
  default: {
    refreshToken: localStorage.getItem('refreshToken') ?? '',
    accessToken: '',
  },
})

const getNewToken = async (refreshToken: string) => {
  const req = new RefreshTokenRequest().setToken(refreshToken)
  const res = await authService.refreshToken(req, null)
  return res.getToken()!
}

export const authAccessToken = selector<string | null>({
  key: 'auth_accessToken',
  get: async ({ get }) => {
    const {refreshToken, accessToken} = get(authTokens)

    if (refreshToken === '') return null
    if (accessToken === '') return getNewToken(refreshToken)

    const claims = jwtDecode<JWT>(accessToken)
    if (claims.exp - 300 < new Date().getTime() / 1000) {
      return getNewToken(refreshToken)
    }

    return accessToken
  },
  set: ({ get, set }, newToken) => set(authTokens, {
    ...get(authTokens),
    accessToken: newToken as string,
  }),
})

export const isLoggedIn = selector<boolean>({
  key: 'auth_isLoggedIn',
  get: ({ get }) => {
    return get(authTokens).refreshToken !== ''
  },
})

export const authClaims = selector<JWT | null>({
  key: 'auth_claims',
  get: ({ get }) => {
    const token = get(authAccessToken)
    if (token === null) return null

    return jwtDecode<JWT>(token)
  },
})
