import { Problem } from '../models/problem'
import { atom, selector, selectorFamily, setAtomValue } from 'yauk'
import { store } from './store'
import { getAtomValue } from './util'

export const pageSize = 10

export const problemsData = atom<{ [key: string]: Problem }>({})
export const problemsPage = atom(1)

export const problemsLength = selector((get) => {
  const problems = get(problemsData)
  return Object.keys(problems).length
})

export const sortedProblems = selector((get) => {
  const problems = get(problemsData)
  return Object.values(problems).sort((a, b) => a.position - b.position)
})

export const sortedProblemIDs = selector((get) => {
  const problems = get(sortedProblems)
  return problems.map((problem) => problem.id)
})

export const paginatedProblems = selector((get) => {
  const problems = get(sortedProblems)
  const page = get(problemsPage)
  return problems.slice((page - 1) * pageSize, page * pageSize)
})

export const getProblemByID = selectorFamily((id: string) => {
  return (get) => {
    const problems = get(problemsData)
    return problems[id]
  }
})

export type RequiedKey<T, K extends keyof T> = Partial<Omit<T, K>> & Required<Pick<T, K>>

export const updateProblem = (problem: RequiedKey<Problem, 'id'>) => {
  setAtomValue(store, problemsData, (state) => ({
    ...state,
    [problem.id]: {
      ...state[problem.id],
      ...problem,
    },
  }))
}

export const deleteProblem = (id: string) => {
  setAtomValue(store, problemsData, (state) => {
    const position = state[id].position

    return Object.entries(state).reduce((acc, [key, value]) => {
      if (key === id) return acc

      return {
        ...acc,
        [key]: {
          ...value,
          position: value.position > position ? value.position - 1 : value.position,
        },
      }
    }, {})
  })
}

export const swapProblems = (a: string, b: string) => {
  setAtomValue(store, problemsData, (state) => {
    const problemA = { ...state[a] }
    const problemB = { ...state[b] }
    ;[problemA.position, problemB.position] = [problemB.position, problemA.position]

    return {
      ...state,
      [a]: problemA,
      [b]: problemB,
    }
  })
}

export const createProblem = (at: number, id: string) => {
  setAtomValue(store, problemsData, (state) => {
    return Object.entries(state).reduce<{ [key: string]: Problem }>(
      (acc, [key, value]) => {
        return {
          ...acc,
          [key]: {
            ...value,
            position: value.position >= at ? value.position + 1 : value.position,
          },
        }
      },
      {
        [id]: {
          id,
          position: at,
          body: '',
          image: '',
          solution: '',
        },
      }
    )
  })
}

export const getProblemFromPos = async (pos: number): Promise<Problem | undefined> => {
  const problems = await getAtomValue(store, problemsData)
  return Object.values(problems).find((problem) => problem.position === pos)
}
