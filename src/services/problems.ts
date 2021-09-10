import { ClientReadableStream } from 'grpc-web'
import { AdminClient } from '../proto/AdminServiceClientPb'
import { ReadRequest } from '../proto/admin_pb'
import { CompetitionClient } from '../proto/CompetitionServiceClientPb'
import { ProblemStream } from '../proto/shared_pb'
import { getAuth } from '../state/auth'
import { createProblem, deleteProblem, swapProblem, updateProblem } from '../state/problems'
import { createStreamService } from '../utils/streamService'

const handleInitialProblem = (p: ProblemStream.Initial): void => {
  const problem = p.getProblem()!
  updateProblem({
    id: problem.getId(),
    position: p.getAt(),
    body: problem.getBody(),
    image: problem.getImage(),
    solution: problem.getSolution().toString(),
  })
}

const handleUpdateProblem = (p: ProblemStream.Update): void => {
  const problem = p.getProblem()!
  updateProblem({
    id: problem.getId(),
    body: problem.getBody(),
    image: problem.getImage(),
    solution: problem.getSolution().toString(),
  })
}

const handleDeleteProblem = (p: ProblemStream.Delete): void => {
  deleteProblem(p.getId())
}

const handleSwapProblem = (p: ProblemStream.Swap): void => {
  swapProblem(p.getA(), p.getB())
}

const handleCreateProblem = (p: ProblemStream.Create): void => {
  createProblem(p.getAt(), p.getProblem()!.getId())
}

export const createProblemsStream = <T extends AdminClient | CompetitionClient>(
  client: T
): (() => Promise<ClientReadableStream<ProblemStream>>) => {
  return async () => {
    const stream = client.getProblems(
      new ReadRequest(),
      await getAuth()
    ) as ClientReadableStream<ProblemStream>

    stream.on('data', (problem: ProblemStream) => {
      const type = problem.getType()
      switch (type) {
        case ProblemStream.Type.K_INITIAL: {
          handleInitialProblem(problem.getInitial()!)
          break
        }
        case ProblemStream.Type.K_UPDATE: {
          handleUpdateProblem(problem.getUpdate()!)
          break
        }
        case ProblemStream.Type.K_DELETE: {
          handleDeleteProblem(problem.getDelete()!)
          break
        }
        case ProblemStream.Type.K_SWAP: {
          handleSwapProblem(problem.getSwap()!)
          break
        }
        case ProblemStream.Type.K_CREATE: {
          handleCreateProblem(problem.getCreate()!)
          break
        }
        default: {
          console.error(`unknown ProblemStream type: ${type}`)
          break
        }
      }
    })

    return stream
  }
}

export const getProblemsService = <T extends AdminClient | CompetitionClient>(client: T) => {
  return createStreamService(createProblemsStream(client))
}
