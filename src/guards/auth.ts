import { Guard } from "../models/guard";
import { useAuthFunctions } from "../state/auth";

export const useAuthGuard = async (): Promise<Guard> => {
  const {getClaims} = useAuthFunctions()
  const claims = await getClaims()

  if (claims !== null) return { valid: true }

  return {
    valid: false,
    redirect: '/login'
  }
} 
