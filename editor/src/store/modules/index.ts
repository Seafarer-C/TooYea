import { EditorStateConfig, defaultState } from "@/editor/state";
import { CommonState, commonState } from "./common";

export class StoreConfig {
  editor!: EditorStateConfig;
  common!: CommonState;
}

export const defaultStore: StoreConfig = {
  editor: defaultState,
  common: commonState,
};
