import { useEffect } from 'react'
import { useAtom } from 'yauk/react'
import { Guard } from '../models/guard'
import { authClaims, refreshToken } from '../state/auth'

export const useAdminGuard = (): Guard => {
  const claims = useAtom(authClaims)

  useEffect(() => {
    refreshToken()
  }, [])

  if (claims !== null && claims.is_admin) return { valid: true }

  return {
    valid: false,
    redirect: '/login',
  }
}
