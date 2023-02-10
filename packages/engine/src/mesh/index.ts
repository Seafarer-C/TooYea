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
  }

  id: string;
  // 网格模型
  mesh: THREE.Mesh;
  // 贴图
  textures: Array<TooyeaMeshTexture>;

  emit: TooyeaEmit;

  // 为mesh设置贴图
  async setMeshTextures() {
    if (Array.isArray(this.mesh.material)) {
      const textureArray = await Promise.all(
        this.textures.map((tx, i) => {
          // @ts-ignore
          return tx.getTexture();
        })
      );
      this.mesh.material.forEach((mt, i) => {
        const texture = this.textures[Math.min(i, this.textures.length - 1)];
        texture.bindMaterial(i);
        // @ts-ignore Material 上存在 map 字段用于标识贴图
        mt.map = textureArray[Math.min(i, this.textures.length - 1)];
      });
    } else {
      // @ts-ignore Material 上存在 map 字段用于标识贴图
      this.mesh.material.map = await this.textures[0].getTexture();
      this.textures[0].bindMaterial(0);
    }
  }
}
