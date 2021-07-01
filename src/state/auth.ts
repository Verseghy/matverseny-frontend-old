import { Metadata } from 'grpc-web'
import jwtDecode from 'jwt-decode'
import { useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { atom, selector, useRecoilCallback } from 'recoil'
import { RefreshTokenRequest } from '../proto/auth_pb'
import { authService } from '../services'

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
  const history = useHistory()

  const login = useRecoilCallback(({ set }) => (refreshToken: string, accessToken: string) => {
    set(authTokens, {
      refreshToken,
      accessToken,
    })
    localStorage.setItem('refreshToken', refreshToken)

    const claims = jwtDecode<JWT>(accessToken)
    if (claims.is_admin) {
      history.push('/admin')
    } else if (claims.team === '') {
      history.push('/team')
    } else {
      history.push('/competition')
    }
  }, [])

  const logout = useRecoilCallback(({ set }) => () => {
    set(authTokens, () => ({
      refreshToken: '',
      accessToken: '',
    }))
    localStorage.removeItem('refreshToken')
    history.push('/login')
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
  }, [])

  const getAuth = useCallback(async () => {
    return { Authorization: `Bearer: ${await getAccessToken()}` } 
  }, [getAccessToken])

  const getClaims = useCallback(async () => {
    const accessToken = await getAccessToken()
    if (accessToken === '') return null

    return jwtDecode<JWT>(accessToken)
  }, [getAccessToken]) 

  return {login, logout, getAuth, getClaims}
}
