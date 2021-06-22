import { useContext } from "react";
import { AuthContext } from "../context/auth";
import { Guard } from "../models/guard";

export const useLoginGuard = async (): Promise<Guard> => {
  const {getClaims} = useContext(AuthContext)!
  const claims = await getClaims()

  if (claims === null) return { valid: true }

  let redirect = '/competition'
  if (claims!.isAdmin) {
    redirect = '/admin'
  } else if (claims!.team === '') {
    redirect = '/teams'
  }

  return {
    valid: false,
    redirect
  }
} 
