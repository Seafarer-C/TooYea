import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { TooyeaMeshInfoModel } from "@tooyea/types";

import { LifeCycleEnum } from "../constants";
import { TooyeaLoader } from "../loader";

// 编辑器初始化参数
export class TooyeaEditorOptions {
  // 场景配置
  sceneConfig: any;
  // 光源配置
  lightConfig: any;
  // 相机配置
  cameraConfig: any;
}

// 编辑器引擎核心模块
export class TooyeaEditor<T extends TooyeaEditorOptions> {
  constructor(state: T) {
    this.init(state);
  }

  // 编辑器挂载点
  el!: HTMLElement;

  renderer: THREE.WebGLRenderer;

  // 编辑器响应式状态
  state: T;
  listeners: Object;

  scene: THREE.Scene = new THREE.Scene();
  lights!: Array<THREE.Light>;
  camera!: THREE.Camera;

  meshes!: Array<THREE.Mesh>;
  textures!: Array<THREE.Texture>;
  canvases!: Array<HTMLCanvasElement>;

  //#region 初始化逻辑
  init(state: T) {
    this.initState(state);
    this.initLights();
    this.initCamera();
  }

  // 初始化 editor 状态
  initState(stateOps: T) {
    this.state = new Proxy(stateOps, {});
  }

  // 初始化光源
  initLights() {
    //点光源
    const point = new THREE.PointLight(0xffffff);
    point.position.set(400, 200, 300); //点光源位置
    this.scene.add(point); //点光源添加到场景中
    //环境光
    let ambient = new THREE.AmbientLight(0x999999);
    this.scene.add(ambient);
  }

  // 初始化相机
  initCamera() {
    const width = window.innerWidth; //窗口宽度
    const height = window.innerHeight; //窗口高度
    const k = width / height; //窗口宽高比
    const s = 200; //三维场景缩放系数
    //创建相机对象
    // this.camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
    this.camera = new THREE.PerspectiveCamera(45, k, 1, 20000);
    this.camera.position.set(0, 0, 200); //设置相机位置
    this.camera.lookAt(this.scene.position); //设置相机方向(指向的场景对象)
  }
  //#endregion

  //#region 装配配置

  loaders!: Array<TooyeaLoader<T>>;
  plugins!: Array<Object>;
  controls!: Array<any>;

  // 添加 loaders
  addLoaders(clzArray: Array<new (state: T) => TooyeaLoader<T>>) {
    this.loaders = clzArray.map((cls) => new cls(this.state).init());
    return this;
  }

  addPlugins() {
    return this;
  }

  addControls() {
    return this;
  }
  //#endregion

  //#region 生命周期

  // 生命周期回调
  lifeCycleCallbacks: Map<LifeCycleEnum, (vm: this) => Boolean> = new Map();

  // 完成场景初始化
  onCreated(callback: (vm: this) => Boolean) {
    this.lifeCycleCallbacks.set(LifeCycleEnum.CREATED, callback);
    return this;
  }

  // 完成模型及材质的加载
  onMounted(callback: (vm: this) => Boolean) {
    this.lifeCycleCallbacks.set(LifeCycleEnum.MOUNTED, callback);
    return this;
  }

  // 状态变更前
  onBeforeUpdate(callback: (vm: this) => Boolean) {
    this.lifeCycleCallbacks.set(LifeCycleEnum.BEFORE_UPDATE, callback);
    return this;
  }

  // 状态变更后
  onUpdated(callback: (vm: this) => Boolean) {
    this.lifeCycleCallbacks.set(LifeCycleEnum.UPDATED, callback);
    return this;
  }

  // 销毁前
  onBeforeDestroy(callback: (vm: this) => Boolean) {
    this.lifeCycleCallbacks.set(LifeCycleEnum.BEFORE_DESTROY, callback);
    return this;
  }

  // 销毁后
  onDestroyed(callback: (vm: this) => Boolean) {
    this.lifeCycleCallbacks.set(LifeCycleEnum.DESTROYED, callback);
    return this;
  }
  //#endregion

  //#region 加载模型与贴图
  load(meshInfo: TooyeaMeshInfoModel, texture) {
    const { format, meshSrc, textureSrcs, scale, rotation } = meshInfo;
    const loader = this.loaders.find((l) => l.format === format);
    console.log(loader);
    // loader.load({ url: meshSrc });
    loader.loader.load(meshSrc, (obj) => {
      // 直接使用 texture 进行贴图
      obj.children[0].material.forEach((element) => {
        element.map = texture;
      });

      obj.scale.set(...scale); //放大obj组对象
      obj.position.set(50, -450, 0);
      obj.rotation.set(...rotation);
      this.scene.add(obj); //返回的组对象插入场景中
      console.log("物体", obj);
    });
  }
  //#endregion

  // 执行渲染
  mount(el: HTMLElement | string) {
    if (typeof el === "string") {
      this.el = document.getElementById(el);
    } else {
      this.el = el;
    }
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.el,
      antialias: true,
    });

    const width = window.innerWidth; //窗口宽度
    const height = window.innerHeight; //窗口高度
    this.renderer.setSize(width, height);
    // 加载天空盒
    const textureLoader = new THREE.CubeTextureLoader();
    textureLoader.setPath(`/skybox/`);
    const texture = textureLoader.load([
      "right.jpeg",
      "left.jpeg",
      "top.jpeg",
      "bottom.jpeg",
      "front.jpeg",
      "back.jpeg",
    ]);
    console.log(texture);
    texture.encoding = THREE.sRGBEncoding;
    this.scene.background = texture;
    // this.renderer.setClearColor("#a5a9b5", 1); //设置背景颜色

    const controls = new OrbitControls(this.camera, this.renderer.domElement); //创建控件对象
    controls.addEventListener("change", this.render.bind(this)); //监听鼠标、键盘事件
    this.render();
  }

  render() {
    this.renderer.render(this.scene, this.camera); //执行渲染操作
  }

  // 执行销毁
  destroy() {}
}
