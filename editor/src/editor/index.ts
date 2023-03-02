import { TooyeaEditor } from "@tooyea/engine";
// import { GltfLoader } from "./loaders/gltf-loader";
import { ObjLoader } from "./loaders/obj-loader";
import { EditorStateConfig, defaultState } from "./state";

export const editor = new TooyeaEditor<EditorStateConfig>(
  defaultState
).addLoaders([ObjLoader]);
