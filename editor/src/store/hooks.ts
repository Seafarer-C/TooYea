import { createContext, useContext } from "react";
import { StateConfig } from "../editor/state";

export interface IStateOperator {
  key: string;
  value: any;
}

export const StoreContext = createContext({
  state: new StateConfig(),
  dispatch: (_: IStateOperator) => {},
});

export const useStore = () => useContext(StoreContext);
