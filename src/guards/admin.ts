import { useRecoilValue } from "recoil";
import { Guard } from "../models/guard";
import { authClaims } from "../state/auth";

export const useAdminGuard = async (): Promise<Guard> => {
  const claims = useRecoilValue(authClaims)

  if (claims !== null && claims.is_admin) return { valid: true }

  return {
    valid: false,
    redirect: '/login'
  }
} 
