import { ClientReadableStream } from 'grpc-web'
import { Service } from '../models/service'
import { RetryStop, retryStream } from './retry'

export const createStreamService = <T>(
  createStream: () => Promise<ClientReadableStream<T>>
): Service => {
  let serviceStop: null | Promise<RetryStop> = null

  return {
    start: () => {
      if (serviceStop !== null) return
      serviceStop = retryStream(createStream, 2000)
    },
    stop: () => {
      if (serviceStop === null) return
      serviceStop.then((stop) => {
        stop()
      })
      serviceStop = null
    },
  }
}
