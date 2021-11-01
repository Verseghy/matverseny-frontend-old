import { Request, UnaryInterceptor, UnaryResponse } from 'grpc-web'
import { LS_SA_TOKEN } from '../state/superadmin'

export class SAAuthInterceptor implements UnaryInterceptor<any, any> {
  async intercept(
    request: Request<any, any>,
    invoker: (request: Request<any, any>) => Promise<UnaryResponse<any, any>>
  ): Promise<UnaryResponse<any, any>> {
    const token = localStorage.getItem(LS_SA_TOKEN)
    const metadata = request.getMetadata()
    metadata.Authorization = `Bearer: ${token}`
    return invoker(request)
  }
}
