// 场景中的物体信息
export class Tooyea3DFileInfoModel {
  // 文件类型
  format: string;
  // 3d文件资源地址
  fileSrc: string;
  // 贴图资源地址
  textureSrcArrays: Array<string[]>;
  // 缩放倍数
  scale?: [number, number, number];
  // 旋转角度
  rotation?: [number, number, number];
  // 相对位置
  position?: [number, number, number];
}
