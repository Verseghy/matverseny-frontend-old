import { createContext } from "react";
import { useProblems } from "../hooks/problems";
import { AdminClient } from "../proto/AdminServiceClientPb";
import { adminService } from "../services";

export interface AdminContext {
  service: AdminClient,
}

export const AdminContext = createContext<AdminContext | null>(null)

export const AdminProvider: React.FC = ({ children }) => {
  useProblems(adminService)

  return (
    <AdminContext.Provider value={{ service: adminService }}>
      {children}
    </AdminContext.Provider>
  )
}
