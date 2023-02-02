import * as THREE from "three";
import { TooyeaLoader } from "@tooyea/engine";

import { StateConfig } from "../state";

export class ObjLoader extends TooyeaLoader<StateConfig> {
  format = "obj";

  loadHandle = (group: THREE.Group) => {
    console.log(group);
  };
}
