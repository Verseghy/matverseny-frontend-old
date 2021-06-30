import { Metadata } from 'grpc-web'
import jwtDecode from 'jwt-decode'
import { useCallback } from 'react'
import { atom, selector, useRecoilCallback } from 'recoil'
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

export const isLoggedIn = selector<boolean>({
  key: 'auth_isLoggedIn',
  get: ({ get }) => {
    return get(authTokens).refreshToken !== ''
  },
})

export const useAuthFunctions = (): {
  login: (refreshToken: string, accessToken: string) => void,
  logout: () => void,
  getAuth: () => Promise<Metadata>,
  getClaims: () => Promise<JWT | null>,
} => {
  const login = useRecoilCallback(({ set }) => (refreshToken: string, accessToken: string) => {
    set(authTokens, {
      refreshToken,
      accessToken,
    })
    localStorage.setItem('refreshToken', refreshToken)
  }, [])

  const logout = useRecoilCallback(({ set }) => () => {
    set(authTokens, () => ({
      refreshToken: '',
      accessToken: '',
    }))
    localStorage.removeItem('refreshToken')
  }, [])

  const getNewToken = useRecoilCallback(({ set }) => async (refreshToken: string) => {
    const req = new RefreshTokenRequest().setToken(refreshToken)
    const res = await authService.refreshToken(req, null)
    const accessToken= res.getToken()
    set(authTokens, (state) => ({
      ...state,
      accessToken,
    }))
    return accessToken
  }, [])

  const getAccessToken = useRecoilCallback(({ snapshot }) => async () => {
    const {refreshToken, accessToken} = await snapshot.getPromise(authTokens)

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
  })

  const getAuth = useCallback(async () => {
    return { Authorization: `Bearer: ${await getAccessToken()}` } 
  }, [])

  const getClaims = useCallback(async () => {
    const accessToken = await getAccessToken()
    if (accessToken === '') return null

    return jwtDecode<JWT>(accessToken)
  }, []) 

  return {login, logout, getAuth, getClaims}
}
