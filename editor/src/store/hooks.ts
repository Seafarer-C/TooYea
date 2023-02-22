import { createContext, useContext } from "react";
import { IStateOperator } from "./model";
import { StateConfig } from "../editor/state";

export const StoreContext = createContext({
  state: new StateConfig(),
  dispatch: (_: IStateOperator) => {},
});

export const useStore = () => useContext(StoreContext);
