import { fabric } from "fabric";

export class TooyeaCanvasOperator {
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
    // 挂载画布
    (typeof el === "string" ? document.getElementById(el) : el).append(
      this.canvasDom
    );
    setTimeout(() => {
      this.fabricCanvas.add(
        new fabric.Rect({
          top: 120,
          left: 120,
          width: 100,
          height: 100,
        })
      );
      updateCanvas();
    }, 2000);
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
  async initBackground() {
    return new Promise((resolve, reject) =>
      fabric.Image.fromURL(this.backgroundImageSrc, (img) => {
        try {
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
          resolve(true);
        } catch (e) {
          reject(e);
        }
      })
    );
  }
}
