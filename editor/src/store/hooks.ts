import { createContext, useContext } from "react";
import { StoreConfig, defaultStore } from "./modules";
export interface IStateOperator {
  module: keyof StoreConfig;
  key: string;
  value: any;
}
type ActionName<T extends string> = `set${Capitalize<T>}`;
export type ActionNameType<E> = ActionName<keyof E>;
export type StoreAction<T> = { [k in ActionNameType<T>]: (value: any) => void };

export const StoreContext = createContext({
  store: defaultStore as StoreConfig,
  dispatch: (_: IStateOperator) => {},
  actions: {} as { [k in keyof StoreConfig]: StoreAction<StoreConfig[k]> },
});

export const useStore = () => useContext(StoreContext);
