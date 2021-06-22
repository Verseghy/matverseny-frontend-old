import { useContext } from "react";
import { AuthContext } from "../context/auth";
import { Guard } from "../models/guard";

export const useAdminGuard = async (): Promise<Guard> => {
  const {getClaims} = useContext(AuthContext)!
  const claims = await getClaims()

  if (claims !== null && claims.isAdmin) return { valid: true }

  return {
    valid: false,
    redirect: '/login'
  }
} 
