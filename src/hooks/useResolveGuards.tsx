import { useEffect, useRef, useState } from 'react'
import { Guard } from '../models/guard'

export const useResolveGuards = (guards: Promise<Guard>[]): {
  isPending: boolean,
  guard: Guard | null
} => {
  const [isPending, setIsPending] = useState(true)
  const finalGuard = useRef<Guard | null>(null)
  const isUnmounted = useRef(false)

  useEffect(() => () => { isUnmounted.current = true }, [])

  const checkGuards = async () => {
    for (const guard of guards) {
      const result = await guard

      if (isUnmounted.current === true) return

      if (result === 'wait' || result.valid === false) {
        finalGuard.current = result
        setIsPending(false)
        return
      }
    }

    finalGuard.current = await guards[guards.length - 1]
    setIsPending(false)
  }

  if (guards.length === 0) {
    finalGuard.current = {
      valid: true,
    }
    setIsPending(false)
  } else {
    checkGuards()
  }

  return {
    isPending,
    guard: finalGuard.current,
  }
}

