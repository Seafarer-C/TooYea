import * as THREE from "three";
import { EVENTS, TooyeaEmit } from "../constants";
import { TooyeaCanvasOperator } from "../canvas";

export interface ITooyeaMeshTexture {}

export class TooyeaMeshTexture implements ITooyeaMeshTexture {
  constructor({ textureSrc, emit, canvasEl }) {
    this.textureSrc = textureSrc;
    this.emit = emit;
    this.canvasEl = canvasEl;
  }

  id: string;
  meshId: string;
  // 对应 mesh 的 material 索引
  materialIndexs: number[] = [];

  canvasEl: string | HTMLElement;
  // 贴图底图src
  textureSrc: string;
  private texture: THREE.CanvasTexture;

  canvasInit: boolean = false;
  async initCanvas() {
    return new Promise((resolve, reject) => {
      this.canvasOperator
        .initBackground()
        .then(() => {
          this.canvasInit = true;
          resolve(true);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  async getTexture() {
    if (!this.canvasInit) {
      // 初始化创建 canvas 操作对象
      this.canvasOperator = new TooyeaCanvasOperator({
        el: this.canvasEl,
        backgroundImageSrc: this.textureSrc,
        updateCanvas: this.update,
      });
      this.texture = new THREE.CanvasTexture(
        this.canvasOperator.fabricCanvas.getElement()
      );
      await this.initCanvas();
    }
    return this.texture;
  }
  emit: TooyeaEmit;

  // 贴图的canvas操作对象
  canvasOperator?: TooyeaCanvasOperator;

  // 获取fabric画布对象
  getFabricCanvas(): fabric.Canvas {
    return this.canvasOperator.fabricCanvas;
  }

  // 绑定mesh
  bindMesh(meshId: string) {
    this.meshId = meshId;
  }

  bindMaterial(materialIndex: number) {
    this.materialIndexs.push(materialIndex);
  }

  // 更新贴图
  update = () => {
    this.texture.needsUpdate = true;
    console.log("更新", this.texture);
    setTimeout(() => {
      this.emit(EVENTS.RENDER);
    }, 10);
  };
}
