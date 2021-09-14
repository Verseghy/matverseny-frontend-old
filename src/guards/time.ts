import { useAtom } from 'yauk/react'
import { Guard } from '../models/guard'
import { TimeState } from '../models/time'
import { timesService } from '../services/times'
import { competitionState, competitionTime } from '../state/competition'

export const useTimeGuard = (timeState: TimeState): Guard => {
  timesService.start()

  const times = useAtom(competitionTime)
  const state = useAtom(competitionState)

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
