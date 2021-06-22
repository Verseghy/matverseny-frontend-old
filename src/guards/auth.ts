import { useContext } from "react";
import { AuthContext } from "../context/auth";
import { Guard } from "../models/guard";

export const useAuthGuard = async (): Promise<Guard> => {
  const {getClaims} = useContext(AuthContext)!
  const claims = await getClaims()

  if (claims !== null) return { valid: true }

  return {
    valid: false,
    redirect: '/login'
  }
} 
