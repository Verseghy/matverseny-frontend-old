import { ClientReadableStream } from 'grpc-web'
import { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { SetUpdateFn } from '../context/admin'
import { AuthContext } from '../context/auth'
import { Problem } from '../models/problem'
import { AdminClient } from '../proto/AdminServiceClientPb'
import { ReadRequest } from '../proto/admin_pb'
import { CompetitionClient } from '../proto/CompetitionServiceClientPb'
import { ProblemStream } from '../proto/shared_pb'

export type SetProblemFn = (id: string, problem: Partial<Problem>) => void
export type FindProblemFn = (problem: Partial<Problem>) => Problem | undefined

const eqProblem = (p1: Problem, p2: Partial<Problem>): boolean => {
  const keys = Object.keys(p2) as (keyof Problem)[]

  for (const key of keys) {
    if (p1[key] !== p2[key]) return false
  }
  
  return true
}

export const useProblems = <T extends AdminClient | CompetitionClient>(service: T, setUpdate: SetUpdateFn): [Problem[], SetProblemFn, FindProblemFn] => {
  const [problems, setProblems] = useState<{[key: string]: Problem}>({})
  const stream = useRef<ClientReadableStream<ProblemStream> | null>(null)
  const { getAccessToken } = useContext(AuthContext)

  const updateProblem = useCallback((id: string, problem: Partial<Problem>) => {
    setProblems((state) => ({
      ...state,
      [id]: {
        ...state[id],
        ...problem,
      }
    }))
  }, [])


  const findProblem = useCallback((problem: Partial<Problem>): Problem | undefined => {
    return Object.values(problems).find((value) => {
      return eqProblem(value, problem)
    })
  }, [problems])

  useEffect(() => { (async () => {
    const s = service.getProblems(new ReadRequest(), {
      Authorization: `Bearer: ${await getAccessToken()}`
    }) as ClientReadableStream<ProblemStream>

    s.on('data', (p: ProblemStream) => {
      const type = p.getType()
      if (type === ProblemStream.Type.K_INITIAL) {
        const initial = p.getInitial()!
        const problem = initial.getProblem()!

        setUpdate(false)
        setProblems((state) => ({
          ...state,
          [problem.getId()]: {
            id: problem.getId(),
            position: initial.getAt(),
            body: problem.getBody(),
            image: problem.getImage(),
            solution: problem.getSolution().toString(),
          }
        }))
      } else if (type === ProblemStream.Type.K_UPDATE) {
        const update = p.getUpdate()!
        const problem = update.getProblem()!
        const id = problem.getId()!

        setUpdate(false)
        updateProblem(id, {
          id: problem.getId(),
          body: problem.getBody(),
          image: problem.getImage(),
          solution: problem.getSolution().toString(),
        })
      } else if (type === ProblemStream.Type.K_DELETE) {
        const del = p.getDelete()!
        const id = del.getId()

        setUpdate(false)
        setProblems((state) => {
          const position = state[id].position

          const mapped = Object.entries(state).reduce((acc, [key, value]) => {
            if (key === id) return acc

            return {
              ...acc,
              [key]: {
                ...value,
                position: value.position > position ? value.position - 1 : value.position
              }
            }
          }, {})

          return mapped
        })
      } else if (type === ProblemStream.Type.K_SWAP) {
        const swap = p.getSwap()!
        const a = swap.getA()!
        const b = swap.getB()!

        setProblems((state) => {
          let s = Object.assign({}, state) as {[key: string]: Problem}
          [s[a].position, s[b].position] = [s[b].position, s[a].position]
          return s
        })
      } else if (type === ProblemStream.Type.K_CREATE) {
        const create = p.getCreate()!
        const at = create.getAt()
        const id = create.getProblem()!.getId();

        setUpdate(false)
        setProblems((state) => {
          let mapped = Object.entries(state).map(([key, value]) => {
            if (value.position >= at) {
              return [key, {
                ...value,
                position: value.position + 1,
              }]
            } else {
              return [key, value]
            }
          })
          let o = Object.fromEntries(mapped)
          o[id] = {
            id,
            position: at,
            body: '',
            image: '',
            solution: null,
          }
          return o
        })
      } else {
        console.error(`unknown ProblemStream type: ${type}`)
      }
    })

    s.on('end', () => {
      console.log('stream end')
    })

    stream.current = s
  })()}, [service, getAccessToken])

  return [Object.values(problems).sort((a, b) => a.position - b.position), updateProblem, findProblem]
}
