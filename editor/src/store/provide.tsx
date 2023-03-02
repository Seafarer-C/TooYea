import { useReducer } from "react";
import { StoreContext, IStateOperator } from "./hooks";
import { StoreConfig, defaultStore } from "./modules";

function reducer(store: StoreConfig, action: IStateOperator): StoreConfig {
  const { key, value, module } = action;
  return {
    ...store,
    [module]: {
      ...store[module],
      [key]: value,
    },
  };
}

export function ContextProvider({ children }: { children: JSX.Element }) {
  const [store, dispatch] = useReducer(reducer, defaultStore);

  const actions: any = {};
  Object.keys(defaultStore).forEach((module: any) => {
    const state = defaultStore[module as keyof StoreConfig];
    const stateActions = Object.fromEntries(
      Object.keys(state).map((v) => [
        `set${v.charAt(0).toUpperCase() + v.slice(1)}`,
        (value: any) => {
          dispatch({ key: v, value, module });
        },
      ])
    ) as unknown;
    actions[module] = stateActions;
  });

  const value = {
    store,
    dispatch,
    actions,
  };
  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
}
