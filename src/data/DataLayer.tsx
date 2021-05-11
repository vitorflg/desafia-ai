import React, { ReactNode } from 'react';

type Action = {
  type: string;
  payload: Record<string, unknown>;
};
type State = Record<string, any>;
type Dispatch = (action: Action) => void;

const DataStateContext = React.createContext<State | undefined>(undefined);
const DataDispatchContext = React.createContext<Dispatch | undefined>(undefined);

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'setCurrentUser': {
      return {
        ...state,
        ...action.payload,
      };
    }
    case 'clearState': {
      return {};
    }
  }

  return state;
};

const DataProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const [state, dispatch] = React.useReducer(reducer, {});

  return (
    <DataStateContext.Provider value={state}>
      <DataDispatchContext.Provider value={dispatch}>{children}</DataDispatchContext.Provider>
    </DataStateContext.Provider>
  );
};

const useDataState = (): State | undefined => {
  const context = React.useContext(DataStateContext);

  if (context === undefined) {
    throw new Error('Must be used within a Provider');
  }

  return context;
};

const useDataDispatch = (): Dispatch | undefined => {
  const context = React.useContext(DataDispatchContext);

  if (context === undefined) {
    throw new Error('Must be used within a Provider');
  }
  return context;
};

export { useDataState, useDataDispatch, DataProvider };
