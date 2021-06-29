import { atom, selector, selectorFamily, useRecoilCallback } from 'recoil'
import { Problem } from '../models/problem'

export const problemsData = atom<{[key: string]: Problem}>({
  key: 'problems_data',
  default: {},
})

export const sortedProblems = selector({
  key: 'problems_sortedProblems',
  get: ({ get }) => {
    return Object.values(get(problemsData))
      .sort((a, b) => a.position - b.position)
  },
})

export const sortedProblemIDs = selector({
  key: 'problems_sortedProblemIDs',
  get: ({ get }) => {
    const problems = get(sortedProblems)
    return problems.map((problem) => problem.id)
  },
})

export const getProblemByID = selectorFamily({
  key: 'problems_getProblemByID',
  get: (id: string) => ({ get }) => {
    const problems = get(problemsData)
    return problems[id]
  },
})

export type RequiedKey<T, K extends keyof T> = Partial<Omit<T, K>> & Required<Pick<T, K>>

export const useProblemFunctions = (): {
  updateProblem: (problem: RequiedKey<Problem, 'id'>) => void,
  deleteProblem: (id: string) => void,
  swapProblem: (a: string, b: string) => void,
  createProblem: (at: number, id: string) => void,
  getProblemFromPos: (pos: number) => Promise<Problem | undefined>,
} => {
  const updateProblem = useRecoilCallback(({ set }) => (problem: RequiedKey<Problem, 'id'>) => {
    set(problemsData, (state) => ({
      ...state,
      [problem.id]: {
        ...state[problem.id],
        ...problem,
      }
    }))
  }, [])

  const deleteProblem = useRecoilCallback(({ set }) => (id: string) => {
    set(problemsData, (state) => {
      const position = state[id].position

      const mapped = Object.entries(state).reduce((acc, [key, value]) => {
        if (key === id) return acc

        return {
          ...acc,
          [key]: {
            ...value,
            position: value.position > position ? value.position - 1 : value.position
          },
        }
      }, {})

      return mapped
    })
  }, [])

  const swapProblem = useRecoilCallback(({ set }) => (a: string, b: string) => {
    set(problemsData, (state) => {
      const problemA = {...state[a]}
      const problemB = {...state[b]}
      ;[problemA.position, problemB.position] = [problemB.position, problemA.position]

      return {
        ...state,
        [a]: problemA,
        [b]: problemB,
      }
    })
  }, [])

  const createProblem = useRecoilCallback(({ set }) => (at: number, id: string) => {
    set(problemsData, (state) => (
      Object.entries(state).reduce<{[key: string]: Problem}>((acc, [key, value]) => {
        return {
          ...acc,
          [key]: {
            ...value,
            position: value.position >= at ? value.position + 1 : value.position,
          }
        }
      }, {
        [id]: {
          id,
          position: at,
          body: '',
          image: '',
          solution: '',
        }
      })
    ))
  }, [])

  const getProblemFromPos = useRecoilCallback(({ snapshot }) => async (pos: number) => {
    const problems = await snapshot.getPromise(problemsData)
    return Object.values(problems).find((problem) => problem.position === pos)
  }, [])

  return { updateProblem, deleteProblem, swapProblem, createProblem, getProblemFromPos }
}
