import { createContext, useContext } from "react";
import { StateConfig } from "@/editor/state";

export interface IStateOperator {
  key: string;
  value: any;
}
type ActionName<T extends string> = `set${Capitalize<T>}`;
export type ActionNameType = ActionName<keyof StateConfig>;
export type StoreAction = { [k in ActionNameType]: (value: any) => void };

export const StoreContext = createContext({
  state: new StateConfig(),
  dispatch: (_: IStateOperator) => {},
  actions: {} as StoreAction,
});

export const useStore = () => useContext(StoreContext);
