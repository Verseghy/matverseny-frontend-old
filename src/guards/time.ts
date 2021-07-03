import { useRecoilValue } from 'recoil'
import { Guard } from '../models/guard'
import { TimeState } from '../models/time'
import { competitionState, competitionTime } from '../state/competition'

export const useTimeGuard = async (timeState: TimeState): Promise<Guard> => {
  const times = useRecoilValue(competitionTime)
  const state = useRecoilValue(competitionState)

  if (!times.gotTime) return 'wait'

  if (state === timeState) {
    return {
      valid: true,
    }
  }

  if (state === TimeState.BEFORE_COMP) {
    return {
      valid: false,
      redirect: '/wait',
    }
  }

  if (state === TimeState.IN_COMP) {
    return {
      valid: false,
      redirect: '/competition',
    }
  }

  return {
    valid: false,
    redirect: '/end',
  }
}
