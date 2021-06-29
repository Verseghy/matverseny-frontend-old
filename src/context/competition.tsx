import { createContext, Dispatch, SetStateAction, useState } from "react";
import { useProblems } from "../hooks/problems";
import { CompetitionClient } from "../proto/CompetitionServiceClientPb";
import { competitionService } from "../state/competition";

export enum State {
  BEFORE_COMP,
  IN_COMP,
  AFTER_COMP,
}

export interface CompetitionContextType {
  service: CompetitionClient,
  state: State,
  setState: Dispatch<SetStateAction<State>>
}

export const CompetitionContext = createContext<CompetitionContextType | null>(null)

export const CompetitionProvider: React.FC = ({ children }) => {
  useProblems(competitionService)
  const [state, setState] = useState(State.BEFORE_COMP)

  return (
    <CompetitionContext.Provider value={{ service: competitionService, state, setState }}>
      {children}
    </CompetitionContext.Provider>
  )
}
