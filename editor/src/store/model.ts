import * as THREE from "three";

import { TooyeaEditorOptions } from "@tooyea/engine";

export class StateConfig extends TooyeaEditorOptions {
  // Mesh 数量
  numberOfMesh?: number = 0;
  // 当前正在操作的 Mesh
  currentMesh?: THREE.Mesh;
  count: number = 1;
}

export interface IStateOperator {
  key: string;
  value: any;
}
