import { Request, UnaryInterceptor, UnaryResponse } from 'grpc-web'
import { getAtomValue } from 'yauk'
import { store } from '../state/store'
import { saToken } from '../state/superadmin'

export class SAAuthInterceptor implements UnaryInterceptor<any, any> {
  async intercept(
    request: Request<any, any>,
    invoker: (request: Request<any, any>) => Promise<UnaryResponse<any, any>>
  ): Promise<UnaryResponse<any, any>> {
    const token = await getAtomValue(store, saToken)
    const metadata = request.getMetadata()
    metadata.Authorization = `Bearer: ${token}`
    return invoker(request)
  }
}
