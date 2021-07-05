import { DependencyList, EffectCallback, useEffect, useRef } from 'react'

export const useNotFirstEffect = (effect: EffectCallback, deps?: DependencyList) => {
  const firstUpdate = useRef(true)

  useEffect(() => {
    if (firstUpdate.current === true) {
      firstUpdate.current = false
      return
    }

    effect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [effect, ...(deps ?? [])])
}
