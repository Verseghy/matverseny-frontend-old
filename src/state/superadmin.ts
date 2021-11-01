// import jwtDecode from 'jwt-decode'
import { atom } from 'yauk'
import { GetTimeRequest } from '../proto/superadmin_pb'
import { saService } from '../services'

// interface SAJWT {
//   is_sa: boolean
//   exp: number
//   iat: number
//   iss: string
// }

export const LS_SA_TOKEN = 'sat'

export const saToken = atom<string>(() => {
  const token =
    'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc19zYSI6dHJ1ZSwiZXhwIjoxNjUxNTQwNDYzLCJpYXQiOjE2MzU3NzI0NjMsImlzcyI6InZlcnNlZ2h5LW1hdHZlcnNlbnkifQ.0WOEpwXi5uDUIuXyCreGMAqGyIWPxV1tHAqvSN2ukU471PHkHGWf20GGPPKiK0lDu6Pj30A8OvxUiILfJ8-wGA'
  localStorage.setItem(LS_SA_TOKEN, token)

  return token

  // while (true) {
  //   const token = prompt('Token: ')
  //
  //   if (token === null) {
  //     continue
  //   }
  //
  //   try {
  //     const claims = jwtDecode<SAJWT>(token)
  //
  //     if (claims.is_sa === false) {
  //       continue
  //     }
  //
  //     return token
  //   } catch (e: any) {
  //     continue
  //   }
  // }
})

export const saTimes = atom(async () => {
  const times = await saService.getTime(new GetTimeRequest(), null)

  return {
    start: new Date(times.getStart()).getTime(),
    end: new Date(times.getEnd()).getTime(),
  }
})
