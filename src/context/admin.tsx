import { createContext } from "react";
import { useProblems } from "../hooks/problems";
import { AdminClient } from "../proto/AdminServiceClientPb";

const enableDevTools = (process.env.NODE_ENV === 'development' && (window as any).__GRPCWEB_DEVTOOLS__) || (() => {})
const service = new AdminClient('http://localhost:8080', null, null)

enableDevTools([service])

export interface AdminContext {
  service: AdminClient,
}

export const AdminContext = createContext<AdminContext | null>(null)

export const AdminProvider: React.FC = ({ children }) => {
  useProblems(service)

  return (
    <AdminContext.Provider value={{ service }}>
      {children}
    </AdminContext.Provider>
  )
}
