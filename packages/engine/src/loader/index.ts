import { Tooyea3DFileInfoModel } from "@tooyea/types";
import * as THREE from "three";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { EVENTS, TooyeaEmit } from "../constants";
import { TooyeaMesh } from "../mesh";
import { TooyeaMeshTexture } from "../texture";

type LoaderFormat = "obj" | "gltf";

export class TooyeaLoader<T> {
  constructor(state, events) {
    this.state = state;
    this.emit = events;
  }
  state!: T;
  emit: TooyeaEmit;

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

  // 加载3d文件并将模型加载进scene
  async load(
    fileInfo: Tooyea3DFileInfoModel,
    scene: THREE.Scene,
    canvasElArrays?: Array<Array<string | HTMLElement>>
  ) {
    const { fileSrc, textureSrcArrays, scale, rotation, position } = fileInfo;
    const data = await this.loader.loadAsync(fileSrc);
    let group: THREE.Group;
    switch (this.format as LoaderFormat) {
      case "gltf":
        group = data.scene;
        break;
      case "obj":
        group = data;
        break;
    }
    const { meshes, meshTextures } = this.groupHandle({
      group,
      textureSrcArrays,
      canvasElArrays,
    });

    meshes.forEach(async (m) => {
      await m.setMeshTextures();
      console.log(m.mesh);

      scale && m.mesh.scale.set(...scale);
      position && m.mesh.position.set(...position);
      rotation && m.mesh.rotation.set(...rotation);
      scene.add(m.mesh);
      this.emit(EVENTS.RENDER);
    });

    this.loadHandle(data);

    return { meshes, meshTextures };
  }

  private groupHandle({
    group,
    textureSrcArrays,
    canvasElArrays,
  }: {
    group: THREE.Group;
    textureSrcArrays: Array<Array<string>>;
    canvasElArrays?: Array<Array<string | HTMLElement>>;
  }) {
    // 文件内3d网格图形
    const meshes = [];
    // 贴图
    const meshTextures: Array<TooyeaMeshTexture> = [];

    // 直接使用 texture 进行贴图
    // TODO: 首先需要讲group结构排扁成mesh数组
    group.children.forEach((mesh: THREE.Mesh, meshIndex: number) => {
      const textureSrcArray = textureSrcArrays[meshIndex];
      const canvasElArray = canvasElArrays[meshIndex];
      // 生成贴图数组
      const textures = textureSrcArray.map(
        (textureSrc, textureIndex) =>
          new TooyeaMeshTexture({
            textureSrc,
            emit: this.emit,
            canvasEl: canvasElArray[textureIndex],
          })
      );
      meshTextures.push(...textures);
      // 生成网格模型
      meshes.push(new TooyeaMesh({ mesh, textures, emit: this.emit }));
    });

    return {
      meshes,
      meshTextures,
    };
  }
}
