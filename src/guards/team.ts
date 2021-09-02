import { useEffect } from 'react'
import { useAtom } from 'yauk/react'
import { Guard } from '../models/guard'
import { authClaims, refreshToken } from '../state/auth'

export const useTeamGuard = (teamState: 'hasTeam' | 'noTeam'): Guard => {
  const claims = useAtom(authClaims)

  useEffect(() => {
    refreshToken()
  }, [])

  if (claims?.team === '') {
    if (teamState === 'hasTeam') {
      return {
        valid: false,
        redirect: '/team',
      }
    }
    return { valid: true }
  }

  if (teamState === 'hasTeam') {
    return { valid: true }
  }

  return {
    valid: false,
    redirect: '/team/manage',
  }
}
