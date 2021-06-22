import React, { useEffect, useState } from "react"
import { Redirect, Route } from "react-router-dom"
import { Guard, GuardHook, InvalidGuard } from "../models/guard"

export interface PrivateRouteProps {
  path: string,
  component: React.ComponentType<any>,
  guard: GuardHook,
}

const PrivateRoute: React.VFC<PrivateRouteProps> = ({ path, component: Component, guard }) => {
  const [loaded, setLoaded] = useState(false)
  const [finalGuard, setFinalGuard] = useState<Guard>()
  const guardHook = guard()

  useEffect(() => {
    guardHook.then((g) => {
      setFinalGuard(g)
      setLoaded(true)
    })
  },[guard])

  return <Route path={path} render={() => {
    if (!loaded) return null

    if (finalGuard!.valid) {
      return <Component />
    }
    return <Redirect to={(finalGuard as InvalidGuard).redirect} />
  }}/>
}

export default PrivateRoute 
