import { useEffect, useState } from 'react'
import { Guard } from '../models/guard'
import { getClaims } from '../state/auth'

export const useAuthGuard = (): Guard => {
  const [guard, setGuard] = useState<Guard>('wait')

  useEffect(() => {
    getClaims()
      .then<Guard>((claims) => {
        if (claims !== null) return { valid: true }

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
