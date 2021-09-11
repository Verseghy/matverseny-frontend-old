import { getAccessToken } from '../state/auth'
import { Request, UnaryInterceptor, UnaryResponse } from 'grpc-web'

export class AuthInterceptor implements UnaryInterceptor<any, any> {
  async intercept(
    request: Request<any, any>,
    invoker: (request: Request<any, any>) => Promise<UnaryResponse<any, any>>
  ): Promise<UnaryResponse<any, any>> {
    const metadata = request.getMetadata()
    metadata.Authorization = `Bearer: ${await getAccessToken()}`
    return invoker(request)
  }
}
