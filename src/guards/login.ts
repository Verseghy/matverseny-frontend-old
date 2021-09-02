import { useEffect } from 'react'
import { useAtom } from 'yauk/react'
import { Guard } from '../models/guard'
import { authClaims, refreshToken } from '../state/auth'

export const useLoginGuard = (): Guard => {
  const claims = useAtom(authClaims)

  useEffect(() => {
    refreshToken()
  }, [])

  if (claims === null) return { valid: true }

  let redirect = '/competition'
  if (claims.is_admin) {
    redirect = '/admin'
  } else if (claims.team === '') {
    redirect = '/team'
  }

  return {
    valid: false,
    redirect,
  }
}
