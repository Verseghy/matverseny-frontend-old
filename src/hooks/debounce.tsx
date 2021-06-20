import { useEffect, useState } from "react";

export const useDebounce = <T extends any>(value: T, delay: number): T => {
  const [debounceValue, setDebounceValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceValue(value)
    }, delay)

    return () => clearTimeout(handler)
  }, [value, delay])

  return debounceValue
}
