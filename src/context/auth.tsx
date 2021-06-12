import React, { useState } from 'react'
import { AuthClient } from '../proto/AuthServiceClientPb'
import jwt_decode from 'jwt-decode'

interface Claims {
  is_admin: boolean,
  team: string,
  exp: number,
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
  accessToken: '',
  refreshToken: '',
  login: (_aToken: string, _rToken: string): NextPage => NextPage.LOGIN,
}

export const AuthContext = React.createContext(def)

export const AuthProvider: React.FC = ({ children }) => {
  const [refreshToken, setRefreshToken] = useState('');
  const [accessToken, setAccessToken] = useState('');

  const login = (aToken: string, rToken: string): NextPage => {
    localStorage.setItem('refreshToken', rToken)

    setRefreshToken(rToken)
    setAccessToken(aToken)

    const claims: Claims = jwt_decode(aToken)

    if (claims.is_admin) return NextPage.ADMIN
    if (claims.team) return NextPage.COMPETITION
    return NextPage.TEAMS
  }

  const value = {
    service,
    refreshToken,
    accessToken,
    login,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
