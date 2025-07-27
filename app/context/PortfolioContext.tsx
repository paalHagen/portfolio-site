"use client";
import React, { createContext, useContext, useReducer, ReactNode } from "react";

// PortfolioContext.tsx includes (this is all about remembering):
// - the currently selected project (or none)
// - a way to set a selected project
// - a way to clear the selected project

// type definitions (defines the shape of a single project object, like object in Python) - exported for reuse across components
export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  githubUrl: string;
  liveUrl: string;
  stack: string[];
  problem: string;
  solution: string;
  role: string;
  challenges: string[];
  takeaways: string[];
  impact: string;
}

// defines the global state shape for the portfolio
type State = {
  selectedProject?: Project; // the currently selected project (if any)
};

// defines the actions that can update the state
type Action =
  | { type: "SET_SELECTED_PROJECT"; payload: Project } // select a project
  | { type: "CLEAR_SELECTED_PROJECT" }; // clear selection

const initialState: State = {
  selectedProject: undefined,
};

// reducer function to handle state transitions
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_SELECTED_PROJECT":
      return { ...state, selectedProject: action.payload };
    case "CLEAR_SELECTED_PROJECT":
      return { ...state, selectedProject: undefined };
    default:
      return state;
  }
}

// context providing the portfolio state and dispatch function
const PortfolioContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => undefined,
});

// React component: provides portfolio context to its children
export function PortfolioProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <PortfolioContext.Provider value={{ state, dispatch }}>
      {children}
    </PortfolioContext.Provider>
  );
}

// hook to access the portfolio context in components
export function usePortfolio() {
  return useContext(PortfolioContext);
}
