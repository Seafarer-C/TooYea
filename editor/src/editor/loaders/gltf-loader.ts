import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import { TooyeaLoader } from "@tooyea/engine";

import { EditorStateConfig } from "../state";

export class GltfLoader extends TooyeaLoader<EditorStateConfig> {
  format = "gltf";

  loadHandle = (gltf: GLTF) => {
    console.log(gltf);
  };
}
