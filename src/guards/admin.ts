import { useEffect, useState } from 'react'
import { Guard } from '../models/guard'
import { getClaims } from '../state/auth'

export const useAdminGuard = (): Guard => {
  const [guard, setGuard] = useState<Guard>('wait')

  useEffect(() => {
    getClaims()
      .then<Guard>((claims) => {
        if (claims !== null && claims.is_admin) return { valid: true }

        return {
          valid: false,
          redirect: '/login',
        }
      })
      .then((finalGuard) => {
        setGuard(finalGuard)
      })
  }, [])

  return guard
}
