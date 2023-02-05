import { TooyeaMeshInfoModel } from "@tooyea/types";
import * as THREE from "three";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
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
        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath(
          "node_modules/three/examples/jsm/libs/draco/"
        );
        dracoLoader.preload();
        (<GLTFLoader>this.loader).setDRACOLoader(dracoLoader);
        break;
    }
    return this;
  }

  async load(meshInfo: TooyeaMeshInfoModel, scene: THREE.Scene, texture) {
    const { meshSrc, textureSrcs, scale, rotation, position } = meshInfo;
    const data = await this.loader.loadAsync(meshSrc);
    switch (this.format as LoaderFormat) {
      case "gltf":
        data.scene.children.forEach((mesh) => {
          mesh.children.forEach((element) => {
            element.material.map = texture;
          });
        });
        scale && data.scene.scale.set(...scale); //放大obj组对象
        rotation && data.scene.rotation.set(...rotation);
        position && data.position.set(...position);

        scene.add(data.scene); //返回的组对象插入场景中
        break;
      case "obj":
        // 直接使用 texture 进行贴图
        data.children.forEach((mesh) => {
          mesh.material.forEach((element) => {
            element.map = texture;
          });
        });

        data.scale.set(...scale); //放大obj组对象
        data.position.set(...position);
        data.rotation.set(...rotation);
        scene.add(data); //返回的组对象插入场景中

        break;
    }
    this.loadHandle(data);
  }

  groupHandle(group: THREE.Group) {
    group.children.forEach((v: THREE.Object3D) => {});
  }
}
