import jwtDecode from 'jwt-decode'
import { atom } from 'yauk'
import { GetTimeRequest } from '../proto/superadmin_pb'
import { saService } from '../services'

interface SAJWT {
  is_sa: boolean
  exp: number
  iat: number
  iss: string
}

export const LS_SA_TOKEN = 'sat'

export const saToken = atom<string>(() => {
  const lsToken = localStorage.getItem(LS_SA_TOKEN)

  if (lsToken !== null) {
    return lsToken
  }

  while (true) {
    const token = prompt('Token: ')

    if (token === null) {
      continue
    }

    try {
      const claims = jwtDecode<SAJWT>(token)

      if (claims.is_sa === false) {
        continue
      }

      localStorage.setItem(LS_SA_TOKEN, token)
      return token
    } catch (e: any) {
      continue
    }
  }
})

export const saTimes = atom(async () => {
  const times = await saService.getTime(new GetTimeRequest(), null)

  return {
    start: new Date(times.getStart()).getTime(),
    end: new Date(times.getEnd()).getTime(),
  }
})

export interface Result {
  total: number
  successful: number
  team_name: string
}

export interface Results {
  time: number
  result: Map<string, Result>
}

export const saResults = atom<Results[]>([])
