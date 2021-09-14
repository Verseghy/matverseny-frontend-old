import { ClientReadableStream } from 'grpc-web'

export const wait = (timeout: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, timeout)
  })
}

export type RetryStop = () => void

export const wrapStream = <T>(stream: ClientReadableStream<T>): Promise<void> => {
  return new Promise((resolve) => {
    stream.on('end', () => {
      resolve()
    })

    stream.on('error', () => {
      resolve()
    })
  })
}

export const retryStream = async <T>(
  stream: () => Promise<ClientReadableStream<T>> | ClientReadableStream<T>,
  timeout: number
): Promise<RetryStop> => {
  let isStopped = false
  let resolvedStream: ClientReadableStream<T> | null = null

  new Promise<void>(async (resolve) => {
    while (!isStopped) {
      resolvedStream = await Promise.resolve(stream())
      await wrapStream(resolvedStream)
      await wait(timeout)
    }

    resolve()
  })

  return () => {
    if (resolvedStream !== null) {
      resolvedStream.cancel()
    }

    isStopped = true
  }
}
