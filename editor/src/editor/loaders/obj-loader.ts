import * as THREE from "three";
import { TooyeaLoader } from "@tooyea/engine";

import { EditorStateConfig } from "../state";

export class ObjLoader extends TooyeaLoader<EditorStateConfig> {
  format = "obj";

  loadHandle = (group: THREE.Group) => {
    console.log(group, this.state);
  };
}
