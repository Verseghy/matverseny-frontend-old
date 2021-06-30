import { Guard } from "../models/guard";
import { useAuthFunctions } from "../state/auth";

export const useAdminGuard = async (): Promise<Guard> => {
  const {getClaims} = useAuthFunctions()
  const claims = await getClaims()

  if (claims !== null && claims.is_admin) return { valid: true }

  return {
    valid: false,
    redirect: '/login'
  }
} 
