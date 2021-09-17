import React from 'react'
import { Redirect } from 'react-router-dom'
import type { Guard } from '../models/guard'

const resolveGuards = (guards: Guard[]): Guard => {
  if (guards.length === 0) return { valid: true }

  for (const guard of guards) {
    if (guard === 'wait' || guard.valid === false) {
      return guard
    }
  }

  return guards[guards.length - 1]
}

export interface GuardedRouteProps {
  component: React.ComponentType<any>
  guards: Guard[]
}

export const GuardedRoute: React.VFC<GuardedRouteProps> = ({ guards, component: Component }) => {
  const guard = resolveGuards(guards)

  if (guard === 'wait') return null
  if (guard.valid) {
    return <Component />
  }

  return <Redirect to={guard.redirect} />
}
