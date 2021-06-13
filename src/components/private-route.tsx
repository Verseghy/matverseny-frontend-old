import React, { useContext, useEffect, useState } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { AuthContext } from '../context/auth'

export enum Claims {
  ADMIN,
  HAS_TEAM,
  NO_TEAM,
}

export interface PrivateRouteProps {
  path: string,
  component: React.ComponentType<any>,
  claims: Claims,
}

const redirect = <Redirect to="/login" />

const PrivateRoute: React.VFC<PrivateRouteProps> = ({ path, component, claims }) => {
  const [comp, setComp] = useState<typeof redirect | null>(null)
  const { getClaims, refreshToken } = useContext(AuthContext)

  useEffect(() => {
    getClaims().then((ctxClaims) => {
      if (claims === Claims.ADMIN && !ctxClaims.isAdmin) { setComp(redirect) }
      else if (claims === Claims.HAS_TEAM && ctxClaims.team === '') { setComp(redirect) }
      else if (claims === Claims.NO_TEAM && ctxClaims.team !== '') { setComp(redirect) }
      else setComp(<Route path={path} component={component} />)
    })
  }, [getClaims])

  if (!refreshToken) return redirect

  return comp
}

export default PrivateRoute 
