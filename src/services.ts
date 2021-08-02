import { AdminClient } from './proto/AdminServiceClientPb'
import { AuthClient } from './proto/AuthServiceClientPb'
import { CompetitionClient } from './proto/CompetitionServiceClientPb'
import { TeamClient } from './proto/TeamServiceClientPb'

const devTools = (window as any).__GRPCWEB_DEVTOOLS__
const enableGRPCDevTools =
  process.env.NODE_ENV === 'development' && !!devTools ? devTools : () => {}

export const authService = new AuthClient(process.env.REACT_APP_BACKEND_URL!, null, null)
export const adminService = new AdminClient(process.env.REACT_APP_BACKEND_URL!, null, null)
export const competitionService = new CompetitionClient(
  process.env.REACT_APP_BACKEND_URL!,
  null,
  null
)
export const teamService = new TeamClient(process.env.REACT_APP_BACKEND_URL!, null, null)

enableGRPCDevTools([authService, adminService, competitionService, teamService])
