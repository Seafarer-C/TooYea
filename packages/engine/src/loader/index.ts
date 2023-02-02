import * as THREE from "three";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

type LoaderFormat = "obj" | "gltf";

export class TooyeaLoader<T> {
  constructor(state) {
    this.state = state;
  }
  state!: T;

  // loader`s format, used to identify the file type
  format!: string;
  // three`s loader, used to load model
  loader!: THREE.Loader;

  // loader`s callback function
  loadHandle!: (data: any) => void;

  // init loader
  init() {
    switch (this.format) {
      case "obj":
        this.loader = new OBJLoader();
        break;
      case "gltf":
        this.loader = new GLTFLoader();
        break;
    }
    return this;
  }

  async load(params: {
    url: string;
    onProgress?: (event: ProgressEvent) => void;
    onError?: (event: ErrorEvent) => void;
  }) {
    const data = await this.loader.loadAsync(params.url, params.onProgress);
    switch (this.format as LoaderFormat) {
      case "gltf":
        break;
      case "obj":
        break;
    }
    this.loadHandle(data);
  }
}
