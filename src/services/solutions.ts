import { ClientReadableStream } from 'grpc-web'
import { setAtomValue } from 'yauk'
import { GetSolutionsRequest, GetSolutionsResponse } from '../proto/competition_pb'
import { competitionService } from '../services'
import { getAuth } from '../state/auth'
import { solutionsData } from '../state/competition'
import { store } from '../state/store'
import { createStreamService } from '../utils/streamService'

export const createSolutionsStream = async (): Promise<
  ClientReadableStream<GetSolutionsResponse>
> => {
  const stream = competitionService.getSolutions(
    new GetSolutionsRequest(),
    await getAuth()
  ) as ClientReadableStream<GetSolutionsResponse>

  stream.on('data', (res: GetSolutionsResponse) => {
    if (res.getType() === GetSolutionsResponse.Modification.K_CHANGE) {
      setAtomValue(store, solutionsData, (state) => ({
        ...state,
        [res.getId()]: res.getValue().toString(),
      }))
      return
    }

    setAtomValue(store, solutionsData, (state) => ({
      ...state,
      [res.getId()]: '',
    }))
  })

  return stream
}

export const solutionsService = createStreamService(createSolutionsStream)
