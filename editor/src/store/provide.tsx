import { useReducer } from "react";
import { StoreContext } from "./hooks";
import { IStateOperator, StateConfig } from "./model";

function reducer(state: StateConfig, action: IStateOperator) {
  return {
    ...state,
    [action.key]: action.value,
  };
}

export function ContextProvider({ children }: { children: JSX.Element }) {
  const [state, dispatch] = useReducer(reducer, new StateConfig());
  const value = {
    state,
    dispatch,
  };
  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
}
