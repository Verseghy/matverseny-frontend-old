import { useRecoilValue } from "recoil";
import { Guard } from "../models/guard";
import { authClaims } from "../state/auth";

export const useAuthGuard = async (): Promise<Guard> => {
  const claims = useRecoilValue(authClaims)

  if (claims !== null) return { valid: true }

  return {
    valid: false,
    redirect: '/login'
  }
} 
