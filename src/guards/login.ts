import { useEffect, useState } from 'react'
import { Guard } from '../models/guard'
import { getClaims } from '../state/auth'

export const useLoginGuard = (): Guard => {
  const [guard, setGuard] = useState<Guard>('wait')

  useEffect(() => {
    getClaims()
      .then<Guard>((claims) => {
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
      })
      .then((finalGuard) => {
        setGuard(finalGuard)
      })
  }, [])

  return guard
}
