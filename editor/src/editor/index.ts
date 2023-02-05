import { TooyeaEditor } from "@tooyea/engine";
import { GltfLoader } from "./loaders/gltf-loader";
import { ObjLoader } from "./loaders/obj-loader";
import { StateConfig } from "./state";

const state = {
  sceneConfig: {},
  lightConfig: {},
  cameraConfig: {},
};

export const editor = new TooyeaEditor<StateConfig>(state).addLoaders([
  ObjLoader,
  GltfLoader,
]);
