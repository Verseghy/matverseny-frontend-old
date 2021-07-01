import { AdminClient } from './proto/AdminServiceClientPb'
import { AuthClient } from './proto/AuthServiceClientPb'
import { CompetitionClient } from './proto/CompetitionServiceClientPb'

const enableGRPCDevTools =
  process.env.NODE_ENV === 'development'
    ? (window as any).__GRPCWEB_DEVTOOLS__
    : () => {}

export const authService = new AuthClient(
  process.env.REACT_APP_BACKEND_URL!,
  null,
  null
)
export const adminService = new AdminClient(
  process.env.REACT_APP_BACKEND_URL!,
  null,
  null
)
export const competitionService = new CompetitionClient(
  process.env.REACT_APP_BACKEND_URL!,
  null,
  null
)

enableGRPCDevTools([authService, adminService, competitionService])
