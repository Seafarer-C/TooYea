// 场景中的物体信息
export class TooyeaMeshInfoModel {
  // mesh 资源地址
  meshSrc: string;
  // 贴图资源地址
  textureSrcs: string[];
  // 缩放倍数
  scale: [number, number, number];
  // 旋转角度
  rotation: [number, number, number];
}
