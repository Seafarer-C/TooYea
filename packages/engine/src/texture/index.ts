import * as THREE from "three";
import { EVENTS, TooyeaEmit } from "../constants";
import { TooyeaCanvasOperator } from "../canvas";

export class TooyeaMeshTexture {
  constructor({ textureSrc, emit, canvasEl }) {
    this.textureSrc = textureSrc;
    this.emit = emit;

    // 初始化创建 canvas 操作对象
    this.canvasOperator = new TooyeaCanvasOperator({
      el: canvasEl,
      backgroundImageSrc: textureSrc,
      updateCanvas: this.update,
    });
    this.texture = new THREE.CanvasTexture(
      this.canvasOperator.fabricCanvas.getElement()
    );
  }

  id: string;
  meshId: string;
  // 对应 mesh 的 material 索引
  materialIndex: number;

  // 贴图底图src
  textureSrc: string;
  private texture: THREE.Texture;

  async getTexture() {
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
    this.materialIndex = materialIndex;
  }

  // 更新贴图
  update() {
    this.texture.needsUpdate = true;
    this.emit(EVENTS.RENDER);
  }
}
