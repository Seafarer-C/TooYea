import { TooyeaEditorOptions } from "@tooyea/engine";
import * as THREE from "three";

export class StateConfig extends TooyeaEditorOptions {
  // Mesh 数量
  numberOfMesh?: number = 0;
  // 当前正在操作的 Mesh
  currentMesh?: THREE.Mesh;
}
