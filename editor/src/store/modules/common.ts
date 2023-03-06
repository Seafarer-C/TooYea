import { TooyeaMeshTexture, TooyeaCanvasOperator } from "@tooyea/engine";
import { fabric } from "fabric";

export class CommonState {
  // 加载获取到的所有 mesh 贴图
  meshTextures: Array<TooyeaMeshTexture> = [];
  // 当前所正在处理的 canvas operator
  currentOperator?: TooyeaCanvasOperator;
  // 当前 canvas 内的元素
  currentElements?: Array<fabric.Object>;
}
export const commonState = {
  meshTextures: [],
  currentOperator: undefined,
  currentElements: [],
};
