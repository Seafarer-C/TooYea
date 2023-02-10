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
    // 挂载画布
    (typeof el === "string" ? document.getElementById(el) : el).append(
      this.canvasDom
    );
    this.fabricCanvas = new fabric.Canvas(this.canvasDom, {
      overlayImage: backgroundImageSrc,
      overlayVpt: false, // 如果设置为假覆盖图像不受视口变换的影响
      backgroundColor: "red", // 背景色
    });
    this.fabricCanvas.on("mouse:up", (options) => {
      console.log("mouse:up事件：", options);
      updateCanvas();
    });
    this.backgroundImageSrc = backgroundImageSrc;
    this.updateCanvas = updateCanvas;

    setTimeout(() => {
      const rect = new fabric.Rect({
        top: 120,
        left: 120,
        width: 100,
        height: 100,
        fill: "yellow",
      });
      rect.on("moving", (options) => {
        console.log("rect moving事件：", options);
        updateCanvas();
      });
      this.fabricCanvas.add(rect);
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
          this.fabricCanvas.setWidth(img.width, {
            backstoreOnly: true,
          });
          this.fabricCanvas.setHeight(img.height, {
            backstoreOnly: true,
          });

          this.canvasDom.style.width = "100%!important";
          this.canvasDom.style.height = "100%!important";

          // this.fabricCanvas.setBackgroundImage(
          //   img,
          //   this.fabricCanvas.renderAll.bind(this.fabricCanvas)
          // );
          resolve(true);
        } catch (e) {
          reject(e);
        }
      })
    );
  }
}

// 背景图转前景图
function t(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d");

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

  function invertColors(data) {
    for (var i = 0; i < data.length; i += 4) {
      if (data[i + 3] === 0) {
        data[i] = 255;
        data[i + 1] = 255;
        data[i + 2] = 255;
        data[i + 3] = 255;
      } else {
        data[i] = 0;
        data[i + 1] = 0;
        data[i + 2] = 0;
        data[i + 3] = 0;
      }
    }
  }
  invertColors(imageData.data);

  ctx.putImageData(imageData, 0, 0);
}
