import { useEffect, useState } from 'react'
import { Guard } from '../models/guard'
import { getClaims } from '../state/auth'

export const useTeamGuard = (teamState: 'hasTeam' | 'noTeam'): Guard => {
  const [guard, setGuard] = useState<Guard>('wait')

  useEffect(() => {
    getClaims()
      .then<Guard>((claims) => {
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
      })
      .then((finalGuard) => {
        setGuard(finalGuard)
      })
  }, [teamState])

  return guard
}
