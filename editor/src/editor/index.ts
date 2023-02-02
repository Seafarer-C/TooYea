import { TooyeaEditor } from "@tooyea/engine";

import { ObjLoader } from "./loaders/obj-loader";
import { StateConfig } from "./state";

const state = {
  sceneConfig: {},
  lightConfig: {},
  cameraConfig: {},
};

export const editor = new TooyeaEditor<StateConfig>(state).addLoaders([
  ObjLoader,
]);
