import { createContext } from "react";
import { useProblems } from "../hooks/problems";
import { Problem } from "../models/problem";
import { CompetitionClient } from "../proto/CompetitionServiceClientPb";

const enableDevTools = (process.env.NODE_ENV === 'development' && (window as any).__GRPCWEB_DEVTOOLS__) || (() => {})
const service = new CompetitionClient('http://localhost:8080', null, null)

enableDevTools([service])

export interface CompetitionContextType {
  service: CompetitionClient,
  data: Problem[],
  solutions: {[key: string]: string},
}

export const CompetitionContext = createContext<CompetitionContextType | null>(null)

export const CompetitionProvider: React.FC = ({ children }) => {
  const [data, _a, _b, solutions] = useProblems(service)

  return (
    <CompetitionContext.Provider value={{ service, data, solutions }}>
      {children}
    </CompetitionContext.Provider>
  )
}
