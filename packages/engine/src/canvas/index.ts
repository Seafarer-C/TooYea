import { fabric } from "fabric";

// 创建画布元素
export const createCanvas = () => {
  const canvasElement = document.createElement("canvas");
  const canvas = new fabric.Canvas(canvasElement);

  // 注册挂件

  // @ts-ignore 拓展 canvas 的挂载方法
  canvas.mount = (el: HTMLElement | string) => {
    if (typeof el === "string") {
      document.getElementById(el).append(canvasElement);
    } else {
      el.append(canvasElement);
    }
  };
  return canvas;
};
