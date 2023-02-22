import { TooyeaEditor } from "@tooyea/engine";
// import { GltfLoader } from "./loaders/gltf-loader";
import { ObjLoader } from "./loaders/obj-loader";
import { StateConfig, defaultState } from "./state";

export const editor = new TooyeaEditor<StateConfig>(defaultState).addLoaders([
  ObjLoader,
]);
