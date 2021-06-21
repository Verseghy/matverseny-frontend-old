import { createContext } from "react";
import { FindProblemFn, useProblems } from "../hooks/problems";
import { Problem } from "../models/problem";
import { AdminClient } from "../proto/AdminServiceClientPb";
import { SetProblemFn } from '../hooks/problems'

const enableDevTools = (process.env.NODE_ENV === 'development' && (window as any).__GRPCWEB_DEVTOOLS__) || (() => {})
const service = new AdminClient('http://localhost:8080', null, null)

enableDevTools([service])

export interface AdminContext {
  service: AdminClient,
  data: Problem[],
  setProblem: SetProblemFn,
  findProblemFromPos: FindProblemFn,
}

export const AdminContext = createContext<AdminContext | null>(null)

export const AdminProvider: React.FC = ({ children }) => {
  const [data, setProblem, findProblemFromPos] = useProblems(service)

  return (
    <AdminContext.Provider value={{ service, data, setProblem, findProblemFromPos }}>
      {children}
    </AdminContext.Provider>
  )
}
