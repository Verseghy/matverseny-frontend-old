import { createContext, Dispatch, SetStateAction, useState } from "react";
import { useProblems } from "../hooks/problems";
import { Problem } from "../models/problem";
import { CompetitionClient } from "../proto/CompetitionServiceClientPb";

const enableDevTools = (process.env.NODE_ENV === 'development' && (window as any).__GRPCWEB_DEVTOOLS__) || (() => {})
export const service = new CompetitionClient('http://localhost:8080', null, null)

enableDevTools([service])

export enum State {
  BEFORE_COMP,
  IN_COMP,
  AFTER_COMP,
}

export interface CompetitionContextType {
  service: CompetitionClient,
  data: Problem[],
  solutions: {[key: string]: string},
  state: State,
  setState: Dispatch<SetStateAction<State>>
}

export const CompetitionContext = createContext<CompetitionContextType | null>(null)

export const CompetitionProvider: React.FC = ({ children }) => {
  const [data, _a, _b, solutions] = useProblems(service)
  const [state, setState] = useState(State.BEFORE_COMP)

  return (
    <CompetitionContext.Provider value={{ service, data, solutions, state, setState }}>
      {children}
    </CompetitionContext.Provider>
  )
}
