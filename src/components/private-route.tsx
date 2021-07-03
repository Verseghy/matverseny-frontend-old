import React, { useEffect, useState } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { Guard, InvalidGuard } from '../models/guard'

export interface PrivateRouteProps {
  path: string
  component: React.ComponentType<any>
  guards: Promise<Guard>[]
}

const PrivateRoute: React.VFC<PrivateRouteProps> = ({ path, component: Component, guards }) => {
  const [loaded, setLoaded] = useState(false)
  const [finalGuard, setFinalGuard] = useState<Guard>()

  useEffect(() => {
    const checkGuards = async () => {
      for (const guard of guards) {
        const result = await guard

        if (result === 'wait') return

        if (result.valid === false) {
          setFinalGuard(result)
          setLoaded(true)
          return
        }
      }

      setFinalGuard(await guards[guards.length - 1])
      setLoaded(true)
    }

    checkGuards()
  }, [guards])

  return (
    <Route
      path={path}
      render={() => {
        if (!loaded || finalGuard === 'wait') return null

        if (finalGuard!.valid) return <Component />

        return <Redirect to={(finalGuard as InvalidGuard).redirect} />
      }}
    />
  )
}

export default PrivateRoute
