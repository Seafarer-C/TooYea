import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import { TooyeaLoader } from "@tooyea/engine";

import { StateConfig } from "../state";

export class GltfLoader extends TooyeaLoader<StateConfig> {
  format = "gltf";

  loadHandle = (gltf: GLTF) => {
    console.log(gltf);
  };
}
