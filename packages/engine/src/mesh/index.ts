import * as THREE from "three";
import { TooyeaEmit } from "../constants";
import { TooyeaMeshTexture } from "../texture";

export class TooyeaMesh {
  constructor({
    mesh,
    textures,
    emit,
  }: {
    mesh: THREE.Mesh;
    textures: Array<TooyeaMeshTexture>;
    emit: TooyeaEmit;
  }) {
    this.mesh = mesh;
    this.id = mesh.uuid;
    this.emit = emit;
    this.textures = textures;
    this.textures.forEach((t) => t.bindMesh(this.id));
    // 为mesh设置贴图
    this.setMeshTextures();
  }

  id: string;
  // 网格模型
  mesh: THREE.Mesh;
  // 贴图
  textures: Array<TooyeaMeshTexture>;

  emit: TooyeaEmit;

  // 为mesh设置贴图
  setMeshTextures() {
    if (Array.isArray(this.mesh.material)) {
      this.mesh.material.forEach((m, i) => {
        const texture = this.textures[Math.min(i, this.textures.length - 1)];
        // @ts-ignore
        m.map = texture.texture;
        texture.bindMaterial(i);
      });
    } else {
      // @ts-ignore Material 上存在 map 字段用于标识贴图
      this.mesh.material.map = this.textures[0].texture;
      this.textures[0].bindMaterial(0);
    }
  }
}
