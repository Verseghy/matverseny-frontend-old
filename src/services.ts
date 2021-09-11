import { AuthInterceptor } from './interceptors/auth'
import { DebugInterceptor, DebugStreamInterceptor } from './interceptors/debug'
import { LogoutInterceptor } from './interceptors/logout'
import { AdminClient } from './proto/AdminServiceClientPb'
import { AuthClient } from './proto/AuthServiceClientPb'
import { CompetitionClient } from './proto/CompetitionServiceClientPb'
import { TeamClient } from './proto/TeamServiceClientPb'

export const authService = new AuthClient(process.env.REACT_APP_BACKEND_URL!, null, {
  unaryInterceptors: [new LogoutInterceptor(), new DebugInterceptor()],
})
export const adminService = new AdminClient(process.env.REACT_APP_BACKEND_URL!, null, {
  unaryInterceptors: [new AuthInterceptor(), new DebugInterceptor()],
  streamInterceptors: [new AuthInterceptor(), new DebugStreamInterceptor()],
})
export const competitionService = new CompetitionClient(process.env.REACT_APP_BACKEND_URL!, null, {
  unaryInterceptors: [new AuthInterceptor(), new DebugInterceptor()],
  streamInterceptors: [new AuthInterceptor(), new DebugStreamInterceptor()],
})
export const teamService = new TeamClient(process.env.REACT_APP_BACKEND_URL!, null, {
  unaryInterceptors: [new AuthInterceptor(), new DebugInterceptor()],
})
