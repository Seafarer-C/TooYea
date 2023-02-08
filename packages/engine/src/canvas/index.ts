import { fabric } from "fabric";

export class TooyeaCanvas {
  constructor({
    el,
    backgroundImageSrc,
    updateCanvas,
  }: {
    el: HTMLElement | string;
    backgroundImageSrc: string;
    // 更新画布事件
    updateCanvas: Function;
  }) {
    this.fabricCanvas = new fabric.Canvas(this.canvasDom);
    this.backgroundImageSrc = backgroundImageSrc;
    this.updateCanvas = updateCanvas;
    // 初始化背景图
    this.initBackground();
    // 挂载画布
    (typeof el === "string" ? document.getElementById(el) : el).append(
      this.canvasDom
    );
  }

  id: string;
  meshId: string;
  textureId: string;

  canvasDom: HTMLCanvasElement = document.createElement("canvas");
  // fabric canvas对象
  fabricCanvas: fabric.Canvas;
  // 背景图资源地址
  backgroundImageSrc: string;

  widgets = [];
  updateCanvas: Function;

  // 设置背景图
  initBackground() {
    fabric.Image.fromURL(this.backgroundImageSrc, (img) => {
      img.set({
        originX: "left",
        originY: "top",
      });
      this.fabricCanvas.setWidth(img.width);
      this.fabricCanvas.setHeight(img.height);
      this.canvasDom.style.width = "100%";
      this.canvasDom.style.height = "100%";
      this.fabricCanvas.setBackgroundImage(
        img,
        this.fabricCanvas.renderAll.bind(this.fabricCanvas)
      );
    });
  }
}
