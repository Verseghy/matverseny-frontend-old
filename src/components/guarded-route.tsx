import React from 'react'
import { Redirect } from 'react-router-dom'
import { useResolveGuards } from '../hooks'
import type { Guard, InvalidGuard, ValidGuard } from '../models/guard'

export interface GuardedRouteProps {
  component: React.ComponentType<any>
  guards: Guard[]
}

export const GuardedRoute: React.VFC<GuardedRouteProps> = ({ guards, component: Component }) => {
  const guard = useResolveGuards(guards)

  if (guard === 'wait') return null
  if ((guard as ValidGuard).valid) return <Component />

  return <Redirect to={(guard as InvalidGuard).redirect} />
}
