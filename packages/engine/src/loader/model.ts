import * as THREE from "three";

export class TooyeaLoader<T> {
  constructor(state) {
    this.state = state;
  }
  // loader`s name, used to identify the file type, eg .obj
  name!: string;
  // three`s loader, used to load model
  loader!: THREE.Loader;
  state!: T;

  // loader`s callback function
  loadCallBack!: Function;

  load() {}
}
