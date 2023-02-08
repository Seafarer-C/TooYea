import * as THREE from "three";
import { EVENTS, TooyeaEmit } from "../constants";
import { TooyeaCanvas } from "../canvas";

export class TooyeaMeshTexture {
  constructor({ textureSrc, emit, canvasEl }) {
    this.textureSrc = textureSrc;
    this.emit = emit;

    this.canvas = new TooyeaCanvas({
      el: canvasEl,
      backgroundImageSrc: textureSrc,
      updateCanvas: this.update,
    });
    this.texture = new THREE.CanvasTexture(
      this.canvas.fabricCanvas.getElement()
    );
  }

  id: string;
  meshId: string;
  materialIndex: number;
  // 贴图底图src
  textureSrc: string;
  texture: THREE.Texture;
  emit: TooyeaEmit;

  // 贴图的canvas操作对象
  canvas?: TooyeaCanvas;

  getFabricCanvas(): fabric.Canvas {
    return this.canvas.fabricCanvas;
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
