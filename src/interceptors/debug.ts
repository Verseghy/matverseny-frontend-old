import { ClientReadableStream, Request, UnaryInterceptor, UnaryResponse } from 'grpc-web'

const POST_TYPE = '__GRPCWEB_DEVTOOLS__'

export class DebugInterceptor implements UnaryInterceptor<any, any> {
  async intercept(
    request: Request<any, any>,
    invoker: (request: Request<any, any>) => Promise<UnaryResponse<any, any>>
  ): Promise<UnaryResponse<any, any>> {
    const method = (request.getMethodDescriptor() as any).name
    const message = {
      type: POST_TYPE,
      method,
      methodType: 'unary',
      request: request.getRequestMessage().toObject(),
    }
    return invoker(request).then(
      (response) => {
        window.postMessage({
          ...message,
          response: response.getResponseMessage().toObject(),
        })
        return response
      },
      (response) => {
        window.postMessage({
          ...message,
          error: {
            code: response.code,
            message: response.message,
          },
        })
        throw response
      }
    )
  }
}

export class DebugStreamInterceptor {
  async intercept(
    request: Request<any, any>,
    invoker: (request: Request<any, any>) => Promise<ClientReadableStream<any>>
  ): Promise<ClientReadableStream<any>> {
    const method = (request.getMethodDescriptor() as any).name

    window.postMessage({
      type: POST_TYPE,
      method,
      methodType: 'server_streaming',
      request: request.getRequestMessage().toObject(),
    })

    const stream = await invoker(request)

    stream.on('data', (response) => {
      window.postMessage({
        type: POST_TYPE,
        method,
        methodType: 'server_streaming',
        response: response.toObject(),
      })
    })

    stream.on('status', (status) => {
      if (status.code === 0) {
        window.postMessage({
          type: POST_TYPE,
          method,
          methodType: 'server_streaming',
          response: 'EOF',
        })
      }
    })

    stream.on('error', (error) => {
      if (error.code !== 0) {
        window.postMessage({
          type: POST_TYPE,
          method,
          methodType: 'server_streaming',
          error: {
            code: error.code,
            message: error.message,
          },
        })
      }
    })

    return stream
  }
}
