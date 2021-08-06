import { Guard } from '../models/guard'
import { useAuthFunctions } from '../state/auth'

export const useTeamGuard = async (teamState: 'hasTeam' | 'noTeam'): Promise<Guard> => {
  const { getClaims } = useAuthFunctions()
  const claims = await getClaims()

  if (claims?.team === '') {
    if (teamState === 'hasTeam') {
      return {
        valid: false,
        redirect: '/team',
      }
    }
    return { valid: true }
  }

  if (teamState === 'hasTeam') {
    return { valid: true }
  }
  return {
    valid: false,
    redirect: '/team/manage',
  }
}
