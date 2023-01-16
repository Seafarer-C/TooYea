import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';

import { TooyeaLoader } from '@tooyea/engine';

import { StateConfig } from '../state';

export class ObjLoader extends TooyeaLoader<StateConfig> {
  format = ".obj";
  loader = new OBJLoader();

  loadHandle = (group: THREE.Group) => {
    console.log(group);
  };
}
