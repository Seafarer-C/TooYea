import { useReducer } from "react";
import { StoreContext, IStateOperator } from "./hooks";
import type { ActionNameType, StoreAction } from "./hooks";
import { EditorStateConfig, defaultState } from "@/editor/state";

function reducer(state: EditorStateConfig, action: IStateOperator) {
  return {
    ...state,
    [action.key]: action.value,
  };
}

export function ContextProvider({ children }: { children: JSX.Element }) {
  const [state, dispatch] = useReducer(reducer, defaultState);
  const actions = Object.fromEntries(
    Object.keys(defaultState).map((v) => [
      `set${v.charAt(0).toUpperCase() + v.slice(1)}` as ActionNameType,
      (value: any) => {
        dispatch({ key: v, value });
      },
    ])
  ) as unknown as StoreAction;

  const value = {
    state,
    dispatch,
    actions,
  };
  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
}
