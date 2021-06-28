import { ClientReadableStream } from 'grpc-web'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { Problem } from '../models/problem'
import { AdminClient } from '../proto/AdminServiceClientPb'
import { ReadRequest } from '../proto/admin_pb'
import { CompetitionClient } from '../proto/CompetitionServiceClientPb'
import { GetSolutionsRequest, GetSolutionsResponse } from '../proto/competition_pb'
import { ProblemStream } from '../proto/shared_pb'
import { authAccessToken } from '../state/auth'

export type SetProblemFn = (id: string, problem: Partial<Problem>) => void
export type FindProblemFn = (pos: number) => Problem | undefined

export const useProblems = <T extends AdminClient | CompetitionClient>(service: T): [
  Problem[],
  SetProblemFn,
  FindProblemFn,
  {[key: string]: string},
] => {
  const [problems, setProblems] = useState<{[key: string]: Problem}>({})
  const [solutions, setSolutions] = useState<{[key: string]: string}>({})
  const stream = useRef<ClientReadableStream<ProblemStream> | null>(null)
  const solutionsStream = useRef<ClientReadableStream<GetSolutionsResponse> | null>(null)
  const accessToken = useRecoilValue(authAccessToken)

  const updateProblem = useCallback((id: string, problem: Partial<Problem>) => {
    setProblems((state) => ({
      ...state,
      [id]: {
        ...state[id],
        ...problem,
      }
    }))
  }, [])

  const findProblemFromPos = useCallback((pos: number): Problem | undefined => {
    return Object.values(problems).find((problem) => {
      return problem.position === pos
    })
  }, [problems])

  useEffect(() => { (async () => {
    if (!(service instanceof CompetitionClient)) return

    const stream = service.getSolutions(new GetSolutionsRequest(), {
      Authorization: `Bearer: ${accessToken}`
    }) as ClientReadableStream<GetSolutionsResponse>

    stream.on('data', (res: GetSolutionsResponse) => {
      if (res.getType()! === GetSolutionsResponse.Modification.K_CHANGE) {
        setSolutions((state) => ({
          ...state,
          [res.getId()!]: res.getValue()!.toString(),
        }))
        return
      }
      setSolutions((state) => ({
        ...state,
        [res.getId()!]: '',
      }))
    })

    solutionsStream.current = stream
  })()}, [service])

  useEffect(() => { (async () => {
    const s = service.getProblems(new ReadRequest(), {
      Authorization: `Bearer: ${accessToken}`
    }) as ClientReadableStream<ProblemStream>

    s.on('data', (p: ProblemStream) => {
      const type = p.getType()
      if (type === ProblemStream.Type.K_INITIAL) {
        const initial = p.getInitial()!
        const problem = initial.getProblem()!

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

        updateProblem(id, {
          id: problem.getId(),
          body: problem.getBody(),
          image: problem.getImage(),
          solution: problem.getSolution().toString(),
        })
      } else if (type === ProblemStream.Type.K_DELETE) {
        const del = p.getDelete()!
        const id = del.getId()

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
          let problemA = {...state[a]}
          let problemB = {...state[b]}
          ;[problemA.position, problemB.position] = [problemB.position, problemA.position]
          return {
            ...state,
            [a]: problemA,
            [b]: problemB,
          }
        })
      } else if (type === ProblemStream.Type.K_CREATE) {
        const create = p.getCreate()!
        const at = create.getAt()
        const id = create.getProblem()!.getId();

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
  })()}, [service, accessToken])

  return [
    Object.values(problems).sort((a, b) => a.position - b.position),
    updateProblem,
    findProblemFromPos,
    solutions,
  ]
}
