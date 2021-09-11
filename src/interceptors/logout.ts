import { Request, UnaryInterceptor, UnaryResponse } from 'grpc-web'
import { logout } from '../state/auth'

export class LogoutInterceptor implements UnaryInterceptor<any, any> {
  async intercept(
    request: Request<any, any>,
    invoker: (request: Request<any, any>) => Promise<UnaryResponse<any, any>>
  ): Promise<UnaryResponse<any, any>> {
    return invoker(request).catch((response) => {
      if (response.message === 'E0006: JWT failure') {
        logout()
      }

      return response
    })
  }
}
