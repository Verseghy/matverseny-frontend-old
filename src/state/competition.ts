import { atom, selector, selectorFamily } from 'yauk'
import { TimeState } from '../models/time'
import {
  pageSize,
  problemsData,
  problemsPage,
  sortedProblems as problemsSortedProblems,
} from './problems'

export const solutionsData = atom<{ [key: string]: string }>({})

export const competitionTime = atom({
  gotTime: false,
  start: new Date().getTime(),
  end: new Date().getTime(),
})

export const currentTime = atom(new Date().getTime())

export const competitionState = selector((get) => {
  const times = get(competitionTime)
  const current = get(currentTime)

  if (times.start > current) {
    return TimeState.BEFORE_COMP
  } else if (times.end > current) {
    return TimeState.IN_COMP
  }
  return TimeState.AFTER_COMP
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

export const timeString = selector((get) => {
  const time = get(competitionTime)
  const current = get(currentTime)
  const state = get(competitionState)

  if (state === TimeState.BEFORE_COMP) {
    return formatTime(time.start - current)
  } else if (state === TimeState.IN_COMP) {
    return formatTime(time.end - current)
  }
  return '00:00:00'
})

export const getProblemByID = selectorFamily((problemID: string) => {
  return (get) => {
    const problems = get(problemsData)
    const solutions = get(solutionsData)
    return {
      ...problems[problemID],
      solution: solutions[problemID] ?? '',
    }
  }
})

export const sortedProblems = selector((get) => {
  const problems = get(problemsSortedProblems)
  const solutions = get(solutionsData)
  return problems.map((problem) => ({
    ...problem,
    solution: solutions[problem.id],
  }))
})

export const paginatedProblems = selector((get) => {
  const problems = get(sortedProblems)
  const page = get(problemsPage)
  return problems.slice((page - 1) * pageSize, page * pageSize)
})
