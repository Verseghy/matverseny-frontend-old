import React from 'react'
import { AuthClient } from '../proto/AuthServiceClientPb'

const enableDevTools = (process.env.NODE_ENV === 'development' && (window as any).__GRPCWEB_DEVTOOLS__) || (() => {})
const service = new AuthClient('http://localhost:8080', null, null)

enableDevTools([service])

export const def = {
  service,
  refreshToken: '',
  accessToken: '',
}

export const AuthContext = React.createContext(def)
