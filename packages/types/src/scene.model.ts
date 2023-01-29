import { TooyeaCameraInfoModel } from './camera.model';
import { TooyeaLightInfoModel } from './light.model';
import { TooyeaMeshInfoModel } from './mesh.model';

/**
 * 场景信息
 */
export class TooyeaSceneInfoModel {
  // 相机信息
  cameraInfo: TooyeaCameraInfoModel;
  // 光源信息
  lightInfos: TooyeaLightInfoModel[];
  // 场景中的物体
  meshInfos: TooyeaMeshInfoModel[];

  // 背景色
  backgroundColor: string | number;
  // 背景图片
  backgroundImageSrc: string;
  // 天空盒图片地址
  skyBoxImageSrcs: string[];
}
