import { ITooyeaTextureImages } from "@tooyea/types";
import { fabric } from "fabric";

export class TooyeaCanvasOperator {
  constructor({
    el,
    images,
    updateCanvas,
  }: {
    el: HTMLElement | string;
    images: ITooyeaTextureImages;
    // 更新画布事件
    updateCanvas: Function;
  }) {
    // 挂载画布
    (typeof el === "string" ? document.getElementById(el) : el).append(
      this.canvasDom
    );
    this.fabricCanvas = new fabric.Canvas(this.canvasDom);
    this.fabricCanvas.on("mouse:up", (options) => {
      console.log("mouse:up事件：", options);
      updateCanvas();
    });
    this.images = images;
    this.updateCanvas = updateCanvas;
  }

  id: string;
  meshId: string;
  textureId: string;

  canvasDom: HTMLCanvasElement = document.createElement("canvas");
  // fabric canvas对象
  fabricCanvas: fabric.Canvas;
  // 图片资源地址
  images: ITooyeaTextureImages;

  widgets = [];
  updateCanvas: Function;

  // 初始化图片资源
  async initCanvasImages() {
    const { overlayImageSrc, backgroundColor, backgroundImageSrc } =
      this.images;
    if (overlayImageSrc) {
      const overlayImg = await asyncGetImageFromURL(overlayImageSrc);
      this.fabricCanvas.setWidth(overlayImg.width, {
        backstoreOnly: true,
      });
      this.fabricCanvas.setHeight(overlayImg.height, {
        backstoreOnly: true,
      });
      this.fabricCanvas.setOverlayImage(
        overlayImg,
        this.fabricCanvas.renderAll.bind(this.fabricCanvas)
      );
    }
    if (backgroundImageSrc) {
      const backgroundImg = await asyncGetImageFromURL(backgroundImageSrc);
      this.fabricCanvas.setBackgroundImage(
        backgroundImg,
        this.fabricCanvas.renderAll.bind(this.fabricCanvas)
      );
    }
    if (backgroundColor) {
      this.fabricCanvas.setBackgroundColor(
        backgroundColor,
        this.fabricCanvas.renderAll.bind(this.fabricCanvas)
      );
    }
  }

  // 往画布上新增图片
  async addImage(imgSrc: string) {
    const image = await asyncGetImageFromURL(imgSrc);
    image.on("moving", (options) => {
      console.log("image moving事件：", options);
      this.updateCanvas();
    });
    this.fabricCanvas.add(image);
    this.updateCanvas();
  }

  // 设置背景图
  async setBackgroundImage(imgSrc: string) {
    const backgroundImg = await asyncGetImageFromURL(imgSrc);
    this.fabricCanvas.setBackgroundImage(
      backgroundImg,
      this.fabricCanvas.renderAll.bind(this.fabricCanvas)
    );
  }

  // 设置背景色
  setBackgroundColor(backgroundColor: string) {
    this.fabricCanvas.setBackgroundColor(
      backgroundColor,
      this.fabricCanvas.renderAll.bind(this.fabricCanvas)
    );
  }
}

// 根据图片 URL 获取图片资源
async function asyncGetImageFromURL(imgSrc: string): Promise<fabric.Image> {
  return new Promise((resolve, reject) => {
    fabric.Image.fromURL(imgSrc, (img) => {
      try {
        img.set({
          originX: "left",
          originY: "top",
        });
        resolve(img);
      } catch (err) {
        reject(err);
      }
    });
  });
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
