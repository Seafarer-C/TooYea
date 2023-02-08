import { TooyeaCameraInfoModel } from "./camera.model";
import { TooyeaLightInfoModel } from "./light.model";
import { Tooyea3DFileInfoModel } from "./3dfile.model";

/**
 * 场景信息
 */
export class TooyeaSceneInfoModel {
  // 相机信息
  cameraInfo: TooyeaCameraInfoModel;
  // 光源信息
  lightInfos: TooyeaLightInfoModel[];
  // 场景中需要加载的3d文件
  files: Tooyea3DFileInfoModel[];

  // 背景色
  backgroundColor: string | number;
  // 背景图片
  backgroundImageSrc: string;
  // 天空盒图片地址
  skyBoxImageSrcs: string[];
}
