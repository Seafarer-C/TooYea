import {
  GLTF,
  GLTFLoader,
} from 'three/examples/jsm/loaders/GLTFLoader';

import { TooyeaLoader } from '@tooyea/engine';

import { StateConfig } from '../state';

export class ObjLoader extends TooyeaLoader<StateConfig> {
  format = ".gltf/.glb";
  loader = new GLTFLoader();

  loadHandle = (gltf: GLTF) => {
    console.log(gltf);
  };
}
