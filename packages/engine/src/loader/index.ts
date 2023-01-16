import * as THREE from 'three';

export class TooyeaLoader<T> {
  constructor(state) {
    this.state = state;
  }
  state!: T;

  // loader`s format, used to identify the file type, eg .obj
  format!: string;
  // three`s loader, used to load model
  loader!: THREE.Loader;

  // loader`s callback function
  loadHandle!: (...args) => void;

  async load(params: {
    url: string;
    onProgress?: (event: ProgressEvent) => void;
    onError?: (event: ErrorEvent) => void;
  }) {}
}
