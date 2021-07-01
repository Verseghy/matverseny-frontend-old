import React, { useEffect, useState } from "react"
import { Redirect, Route } from "react-router-dom"
import { Guard, GuardHook, InvalidGuard } from "../models/guard"

export interface PrivateRouteProps {
  path: string,
  component: React.ComponentType<any>,
  guards: GuardHook[],
}

const PrivateRoute: React.VFC<PrivateRouteProps> = ({ path, component: Component, guards }) => {
  const [loaded, setLoaded] = useState(false)
  const [finalGuard, setFinalGuard] = useState<Guard>()
  const guardHooks = guards.map((g) => g())

  useEffect(() => {
    const checkGuards = async () => {
      for (const guard of guardHooks) {
        const result = await guard

        if (result.valid === false) {
          setFinalGuard(result)
          setLoaded(true)
          return
        }
      }

      setFinalGuard(await guardHooks[guardHooks.length - 1])
      setLoaded(true)
    }

    checkGuards()
  },[])

  return <Route path={path} render={() => {
    if (!loaded) return null

    if (finalGuard!.valid)
      return <Component />

    return <Redirect to={(finalGuard as InvalidGuard).redirect} />
  }}/>
}

export default PrivateRoute 
