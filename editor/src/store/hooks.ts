import { createContext, useContext } from "react";
import { StateConfig, IStateOperator } from "./model";

export const StoreContext = createContext({
  state: new StateConfig(),
  dispatch: (_: IStateOperator) => {},
});

export const useStore = () => useContext(StoreContext);
