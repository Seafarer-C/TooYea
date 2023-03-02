import { createContext, useContext } from "react";
import { EditorStateConfig } from "@/editor/state";

export interface IStateOperator {
  key: string;
  value: any;
}
type ActionName<T extends string> = `set${Capitalize<T>}`;
export type ActionNameType = ActionName<keyof EditorStateConfig>;
export type StoreAction = { [k in ActionNameType]: (value: any) => void };

export const StoreContext = createContext({
  state: new EditorStateConfig(),
  dispatch: (_: IStateOperator) => {},
  actions: {} as StoreAction,
});

export const useStore = () => useContext(StoreContext);
