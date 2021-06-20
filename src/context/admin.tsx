import { createContext, Dispatch, SetStateAction, useState } from "react";
import { FindProblemFn, useProblems } from "../hooks/problems";
import { Problem } from "../models/problem";
import { AdminClient } from "../proto/AdminServiceClientPb";
import { SetProblemFn } from '../hooks/problems'

const enableDevTools = (process.env.NODE_ENV === 'development' && (window as any).__GRPCWEB_DEVTOOLS__) || (() => {})
const service = new AdminClient('http://localhost:8080', null, null)

enableDevTools([service])

export type SetUpdateFn = Dispatch<SetStateAction<boolean>>

export interface AdminContext {
  service: AdminClient,
  data: Problem[],
  setProblem: SetProblemFn,
  update: boolean,
  setUpdate: SetUpdateFn,
  findProblem: FindProblemFn,
}

export const AdminContext = createContext<AdminContext | null>(null)

export const AdminProvider: React.FC = ({ children }) => {
  const [update, setUpdate] = useState(false)
  const [data, setProblem, findProblem] = useProblems(service, setUpdate)

  return (
    <AdminContext.Provider value={{ service, data, setProblem, update, setUpdate, findProblem }}>
      {children}
    </AdminContext.Provider>
  )
}
