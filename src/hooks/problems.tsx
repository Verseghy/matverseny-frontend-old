import { ClientReadableStream } from 'grpc-web'
import { useEffect, useRef } from 'react'
import { useSetRecoilState } from 'recoil'
import { Problem } from '../models/problem'
import { AdminClient } from '../proto/AdminServiceClientPb'
import { ReadRequest } from '../proto/admin_pb'
import { CompetitionClient } from '../proto/CompetitionServiceClientPb'
import { GetSolutionsRequest, GetSolutionsResponse } from '../proto/competition_pb'
import { ProblemStream } from '../proto/shared_pb'
import { useAuthFunctions } from '../state/auth'
import { solutionsData } from '../state/competition'
import { useProblemFunctions } from '../state/problems'

export type SetProblemFn = (id: string, problem: Partial<Problem>) => void
export type FindProblemFn = (pos: number) => Problem | undefined

export const useProblems = <T extends AdminClient | CompetitionClient>(service: T) => {
  const stream = useRef<ClientReadableStream<ProblemStream> | null>(null)
  const solutionsStream = useRef<ClientReadableStream<GetSolutionsResponse> | null>(null)
  const setSolutions = useSetRecoilState(solutionsData)
  const {updateProblem, deleteProblem, swapProblem, createProblem} = useProblemFunctions()
  const {getAuth} = useAuthFunctions()

  useEffect(() => { (async () => {
    if (!(service instanceof CompetitionClient)) return

    const stream = service.getSolutions(
      new GetSolutionsRequest(),
      await getAuth()
    ) as ClientReadableStream<GetSolutionsResponse>

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
    const s = service.getProblems(
      new ReadRequest(),
      await getAuth(),
    ) as ClientReadableStream<ProblemStream>

    s.on('data', (p: ProblemStream) => {
      const type = p.getType()
      if (type === ProblemStream.Type.K_INITIAL) {
        const initial = p.getInitial()!
        const problem = initial.getProblem()!
        updateProblem({
          id: problem.getId(),
          position: initial.getAt(),
          body: problem.getBody(),
          image: problem.getImage(),
          solution: problem.getSolution().toString(),
        })
      } else if (type === ProblemStream.Type.K_UPDATE) {
        const update = p.getUpdate()!
        const problem = update.getProblem()!
        updateProblem({
          id: problem.getId(),
          body: problem.getBody(),
          image: problem.getImage(),
          solution: problem.getSolution().toString(),
        })
      } else if (type === ProblemStream.Type.K_DELETE) {
        const del = p.getDelete()!
        const id = del.getId()
        deleteProblem(id)
      } else if (type === ProblemStream.Type.K_SWAP) {
        const swap = p.getSwap()!
        const a = swap.getA()!
        const b = swap.getB()!
        swapProblem(a, b)
      } else if (type === ProblemStream.Type.K_CREATE) {
        const create = p.getCreate()!
        const at = create.getAt()
        const id = create.getProblem()!.getId();
        createProblem(at, id)
      } else {
        console.error(`unknown ProblemStream type: ${type}`)
      }
    })

    s.on('end', () => {
      console.log('stream end')
    })

    stream.current = s
  })()}, [service])
}
