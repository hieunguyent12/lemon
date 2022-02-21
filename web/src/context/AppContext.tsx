import { useContext, createContext, useState, useReducer } from "react";

type Action = { type: "SET_SELECTED_CLASS"; payload: any };
type State = {
  selectedClass: {
    id: string;
    name: string;
  };
} | null;
type Dispatch = (action: Action) => void;

const AppContext = createContext<{ state: State; dispatch: Dispatch }>(null!);

function stateReducer(state: State, action: Action) {
  switch (action.type) {
    case "SET_SELECTED_CLASS": {
      return {
        selectedClass: {
          id: action.payload.id,
          name: action.payload.name,
        },
      };
    }
    default:
      return state;
  }
}

const AppContextProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(stateReducer, null);

  const value = { state, dispatch };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

function useAppContext() {
  const context = useContext(AppContext);

  if (context === undefined) {
    throw new Error("useAppContext must be used within a AppContextProvider");
  }
  return context;
}

export { AppContextProvider, useAppContext };
