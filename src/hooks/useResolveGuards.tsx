import { useEffect, useRef, useState } from 'react'
import { Guard } from '../models/guard'

export const useResolveGuards = (
  guards: Promise<Guard>[]
): {
  isPending: boolean
  guard: Guard | null
} => {
  const isPending = useRef(true)
  const [finalGuard, setFinalGuard] = useState<Guard | null>(null)
  const isUnmounted = useRef(false)

  useEffect(
    () => () => {
      isUnmounted.current = true
    },
    []
  )

  useEffect(() => {
    const checkGuards = async () => {
      for (const guard of guards) {
        const result = await guard

        if (isUnmounted.current === true) return

        if (result === 'wait' || result.valid === false) {
          isPending.current = false
          setFinalGuard(result)
          return
        }
      }

      isPending.current = false
      setFinalGuard(await guards[guards.length - 1])
    }

    isPending.current = true

    if (guards.length === 0) {
      isPending.current = false
      setFinalGuard({
        valid: true,
      })
    } else {
      checkGuards()
    }
  }, [guards])

  return {
    isPending: isPending.current,
    guard: finalGuard,
  }
}
