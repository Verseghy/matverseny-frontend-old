import { DependencyList, useEffect } from 'react'

export const useInterval = (func: () => void, deps: DependencyList, delay: number) => {
  useEffect(() => {
    const interval = setInterval(func, delay)
    return () => clearInterval(interval)
  }, [func, delay, ...deps])
}
