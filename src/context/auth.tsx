import React, { useCallback, useState } from 'react'
import { AuthClient } from '../proto/AuthServiceClientPb'
import jwt_decode from 'jwt-decode'
import { RefreshTokenRequest } from '../proto/auth_pb'

interface JWTClaims {
  is_admin: boolean,
  team: string,
  exp: number,
}

export interface Claims {
  isAdmin: boolean,
  team: string,
}

export enum NextPage {
  ADMIN,
  TEAMS,
  COMPETITION,
  LOGIN,
}

const enableDevTools = (process.env.NODE_ENV === 'development' && (window as any).__GRPCWEB_DEVTOOLS__) || (() => {})
const service = new AuthClient('http://localhost:8080', null, null)

enableDevTools([service])

export const def = {
  service,
  refreshToken: '',
  getAccessToken: async () => '',
  getClaims: async () => ({
    isAdmin: false,
    team: '',
  }),
  login: (_aToken: string, _rToken: string): NextPage => NextPage.LOGIN,
  logout: () => {},
}

export const AuthContext = React.createContext(def)

export const AuthProvider: React.FC = ({ children }) => {
  const [refreshToken, setRefreshToken] = useState(localStorage.getItem('refreshToken') ?? '');
  const [accessToken, setAccessToken] = useState('');
  const [exp, setExp] = useState(0);

  const login = (aToken: string, rToken: string): NextPage => {
    localStorage.setItem('refreshToken', rToken)

    setRefreshToken(rToken)
    setAccessToken(aToken)

    const claims: JWTClaims = jwt_decode(aToken)

    setExp(claims.exp)

    if (claims.is_admin) return NextPage.ADMIN
    if (claims.team) return NextPage.COMPETITION
    return NextPage.TEAMS
  }

  const logout = () => {
    setRefreshToken('')
    localStorage.removeItem('refreshToken')
  }

  const getAccessToken = useCallback(async (): Promise<string> => {
    if (!refreshToken) return ''

    if (new Date(exp - 5 * 60000) < new Date()) {
      const res = await service.refreshToken(new RefreshTokenRequest().setToken(refreshToken), null)
      setAccessToken(res.getToken())
      return res.getToken()
    }

    return accessToken
  }, [refreshToken, service])

  const getClaims = async () => {
    const claims: JWTClaims = jwt_decode(await getAccessToken())

    return {
      isAdmin: claims.is_admin,
      team: claims.team,
    }
  }

  const value = {
    service,
    refreshToken,
    getAccessToken,
    getClaims,
    login,
    logout,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
