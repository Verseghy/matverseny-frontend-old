import { useEffect, useState } from 'react'
import { Guard } from '../models/guard'

export const useResolveGuards = (guards: Guard[]): Guard => {
  const [finalGuard, setFinalGuard] = useState<Guard>({
    valid: true,
  })

  useEffect(() => {
    if (guards.length === 0) return

    for (const guard of guards) {
      if (guard === 'wait' || guard.valid === false) {
        setFinalGuard(guard)
        return
      }
    }

    setFinalGuard(guards[guards.length - 1])
  }, [guards])

  return finalGuard
}
