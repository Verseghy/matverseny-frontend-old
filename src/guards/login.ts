import { useRecoilValue } from "recoil";
import { Guard } from "../models/guard";
import { authClaims } from "../state/auth";

export const useLoginGuard = async (): Promise<Guard> => {
  const claims = useRecoilValue(authClaims)

  if (claims === null) return { valid: true }

  let redirect = '/competition'
  if (claims.is_admin) {
    redirect = '/admin'
  } else if (claims.team === '') {
    redirect = '/teams'
  }

  return {
    valid: false,
    redirect
  }
} 
