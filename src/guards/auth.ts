import { useEffect } from 'react'
import { useAtom } from 'yauk/react'
import { Guard } from '../models/guard'
import { authClaims, refreshToken } from '../state/auth'

export const useAuthGuard = (): Guard => {
  const claims = useAtom(authClaims)

  useEffect(() => {
    refreshToken()
  }, [])

  if (claims !== null) return { valid: true }

  return {
    valid: false,
    redirect: '/login',
  }
}
