import { TooyeaLoader } from "@tooyea/engine";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { StateConfig } from "../state";

export class ObjLoader extends TooyeaLoader<StateConfig> {
  name = ".obj";
  loader = new OBJLoader();

  loadCallBack = (obj: any) => {
    console.log(obj);
  };
}
