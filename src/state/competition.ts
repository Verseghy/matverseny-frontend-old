import { atom, selector, selectorFamily } from 'recoil'
import { CompetitionClient } from '../proto/CompetitionServiceClientPb'
import { problemsData, sortedProblems as problemsSortedProblems } from './problems'

const enableDevTools = (process.env.NODE_ENV === 'development' && (window as any).__GRPCWEB_DEVTOOLS__) || (() => {})
export const competitionService = new CompetitionClient('http://localhost:8080', null, null)

enableDevTools([competitionService])

export enum CompetitionState {
  BEFORE,
  IN,
  AFTER,
}

export const solutionsData = atom<{[key: string]: string}>({
  key: 'competition_solutionsData',
  default: {},
})

export const competitionTime = atom({
  key: 'competition_time',
  default: {},
})

export const competitionState = atom({
  key: 'competition_state',
  default: CompetitionState.BEFORE,
})

export const getProblemByID = selectorFamily({
  key: 'competition_getProblemByID',
  get: (problemID: string) => ({ get }) => {
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
      solution: solutions[problem.id]
    }))
  },
})

