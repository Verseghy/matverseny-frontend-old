import { atom, selector, selectorFamily } from 'recoil'
import { TimeState } from '../models/time'
import { problemsData, sortedProblems as problemsSortedProblems } from './problems'

export enum CompetitionState {
  BEFORE,
  IN,
  AFTER,
}

export const solutionsData = atom<{ [key: string]: string }>({
  key: 'competition_solutionsData',
  default: {},
})

export const competitionTime = atom({
  key: 'competition_time',
  default: {
    start: new Date().getTime(),
    end: new Date().getTime(),
  },
})

export const currentTime = atom({
  key: 'competition_currentTime',
  default: new Date().getTime(),
})

export const competitionState = selector({
  key: 'competition_state',
  get: ({ get }) => {
    const times = get(competitionTime)
    const current = get(currentTime)

    if (times.start > current) {
      return TimeState.BEFORE_COMP
    } else if (times.end > current) {
      return TimeState.IN_COMP
    }
    return TimeState.AFTER_COMP
  },
})

const formatTime = (time: number) => {
  const hours = Math.floor(time / 3600000)
  const minutes = Math.floor(time / 60000) % 60
  const seconds = Math.floor(time / 1000) % 60

  const hoursString = hours < 10 ? `0${hours}` : hours
  const minutesString = `0${minutes}`.slice(-2)
  const secondsString = `0${seconds}`.slice(-2)

  return `${hoursString}:${minutesString}:${secondsString}`
}

export const timeString = selector({
  key: 'competition_timeString',
  get: ({ get }) => {
    const time = get(competitionTime)
    const current = get(currentTime)
    const state = get(competitionState)

    if (state === TimeState.BEFORE_COMP) {
      return formatTime(time.start - current)
    } else if (state === TimeState.IN_COMP) {
      return formatTime(time.end - current)
    }
    return '00:00:00'
  },
})

export const getProblemByID = selectorFamily({
  key: 'competition_getProblemByID',
  get:
    (problemID: string) =>
    ({ get }) => {
      const problems = get(problemsData)
      const solutions = get(solutionsData)
      return {
        ...problems[problemID],
        solution: solutions[problemID] ?? '',
      }
    },
})

export const sortedProblems = selector({
  key: 'competition_sortedProblems',
  get: ({ get }) => {
    const problems = get(problemsSortedProblems)
    const solutions = get(solutionsData)
    return problems.map((problem) => ({
      ...problem,
      solution: solutions[problem.id],
    }))
  },
})
