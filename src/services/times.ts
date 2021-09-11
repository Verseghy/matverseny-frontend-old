import { ClientReadableStream } from 'grpc-web'
import { setAtomValue } from 'yauk'
import { GetTimesRequest, GetTimesResponse } from '../proto/competition_pb'
import { competitionService } from '../services'
import { competitionTime } from '../state/competition'
import { store } from '../state/store'
import { createStreamService } from '../utils/streamService'

const createTimesStream = async (): Promise<ClientReadableStream<GetTimesResponse>> => {
  const stream = await (competitionService.getTimes(new GetTimesRequest()) as any as Promise<
    ClientReadableStream<GetTimesResponse>
  >)

  stream.on('data', (res: GetTimesResponse) => {
    setAtomValue(store, competitionTime, {
      gotTime: true,
      start: new Date(res.getStart()).getTime(),
      end: new Date(res.getEnd()).getTime(),
    })
  })

  return stream
}

export const timesService = createStreamService(createTimesStream)
