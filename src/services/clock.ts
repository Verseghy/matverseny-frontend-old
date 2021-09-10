import { setAtomValue } from 'yauk'
import { Service } from '../models/service'
import { currentTime } from '../state/competition'
import { store } from '../state/store'

let clock: NodeJS.Timer | null = null

export const clockService: Service = {
  start: () => {
    if (clock !== null) return
    clock = setInterval(() => {
      setAtomValue(store, currentTime, new Date().getTime())
    }, 1000)
  },
  stop: () => {
    if (clock === null) return
    clearInterval(clock)
    clock = null
  },
}
