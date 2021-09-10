import { ClientReadableStream } from 'grpc-web'
import { Service } from '../models/service'
import { RetryStop, retryStream } from './retry'

export const createStreamService = <T>(
  createStream: () => Promise<ClientReadableStream<T>>
): Service => {
  let serviceStop: null | RetryStop = null

  return {
    start: async () => {
      if (serviceStop !== null) return
      serviceStop = await retryStream(createStream, 2000)
    },
    stop: () => {
      if (serviceStop === null) return
      serviceStop()
      serviceStop = null
    },
  }
}
