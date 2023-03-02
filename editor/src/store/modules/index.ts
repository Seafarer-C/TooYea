import { EditorStateConfig, defaultState } from "@/editor/state";

export class StoreConfig {
  editor!: EditorStateConfig;
  common!: CommonState;
}

class CommonState {
  a!: number;
}
const commonState = {
  a: 1,
};
export const defaultStore: StoreConfig = {
  editor: defaultState,
  common: commonState,
};
