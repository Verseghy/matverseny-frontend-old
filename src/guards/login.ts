import { Guard } from '../models/guard'
import { useAuthFunctions } from '../state/auth'

export const useLoginGuard = async (): Promise<Guard> => {
  const { getClaims } = useAuthFunctions()
  const claims = await getClaims()

  if (claims === null) return { valid: true }

  let redirect = '/competition'
  if (claims.is_admin) {
    redirect = '/admin'
  } else if (claims.team === '') {
    redirect = '/team'
  }

  return {
    valid: false,
    redirect,
  }
}
