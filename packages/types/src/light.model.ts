/**
 * 光线信息
 */
export class TooyeaLightInfoModel {
  // 光源类型
  type: "point" | "ambient" | "spot";
  // 光线色彩
  color: string | number;
  // 光源位置
  position: [number, number, number];
}
