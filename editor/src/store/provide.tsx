import { useReducer } from "react";
import { StoreContext, IStateOperator } from "./hooks";
import { StateConfig, defaultState } from "../editor/state";

function reducer(state: StateConfig, action: IStateOperator) {
  return {
    ...state,
    [action.key]: action.value,
  };
}

export function ContextProvider({ children }: { children: JSX.Element }) {
  const [state, dispatch] = useReducer(reducer, defaultState);
  const value = {
    state,
    dispatch,
  };
  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
}
