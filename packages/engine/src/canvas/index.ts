import { ITooyeaTextureImages } from "@tooyea/types";
import { fabric } from "fabric";
import { TooyeaRepeatGroup } from "./elements/repeat-group";
import { asyncGetImageFromURL, asyncClone } from "./utils/index";

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
    this.baseImages = images;
    this.updateCanvas = updateCanvas;
  }

  id: string;
  meshId: string;
  textureId: string;

  canvasDom: HTMLCanvasElement = document.createElement("canvas");
  // fabric canvas对象
  fabricCanvas: fabric.Canvas;
  // 静态图片资源地址
  baseImages: ITooyeaTextureImages;
  // 画布上的素材资源
  elements: fabric.Object[] = [];
  // 当前操作的元素
  activeElement: fabric.Object;

  widgets = [];
  updateCanvas: Function;

  // #region 复制粘贴
  private async _paste(
    clipboard: fabric.Object,
    offset: {
      x: number;
      y: number;
    }
  ): Promise<fabric.Object> {
    const clonedObj = await asyncClone(clipboard);
    clonedObj.set({
      left: clonedObj.left + offset.x,
      top: clonedObj.top + offset.y,
      evented: true,
    });
    if (clonedObj.type === "activeSelection") {
      // active selection needs a reference to the canvas.
      clonedObj.canvas = this.fabricCanvas;
      // this should solve the unselectability
      clonedObj.setCoords();
    }
    return clonedObj;
  }

  async paste(
    clipboard: fabric.Object,
    offset: {
      x: number;
      y: number;
    } = { x: 20, y: 20 }
  ): Promise<fabric.Object> {
    const clonedObj = await this._paste(clipboard, offset);
    this.fabricCanvas.setActiveObject(clonedObj);
    if (clonedObj.type === "activeSelection") {
      // @ts-ignore
      clonedObj.forEachObject((obj) => {
        this.fabricCanvas.add(obj);
      });
    } else {
      this.fabricCanvas.add(clonedObj);
    }
    this.updateCanvas();
    return clonedObj;
  }

  copy(target: fabric.Object = this.fabricCanvas.getActiveObject()) {
    target.clone((cloned) => {
      this.paste(cloned);
    });
  }
  // #endregion

  // 初始化图片资源
  async initCanvasImages() {
    const { overlayImageSrc, backgroundColor, backgroundImageSrc } =
      this.baseImages;
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
  async addImage(imgSource: string) {
    const image = await asyncGetImageFromURL(imgSource);
    this.elements.push(image);

    image.on("moving", (options) => {
      this.updateCanvas();
    });
    image.on("scaling", (options) => {
      this.updateCanvas();
    });
    image.on("rotating", (options) => {
      this.updateCanvas();
    });

    this.fabricCanvas.add(image);
    this.updateCanvas();
  }

  // 将图片设置成平铺的组
  async createRepeatGroupFromElement(
    targetElement: fabric.Object = this.fabricCanvas.getActiveObject(),
    options?: {
      rowGap: number;
      columnGap: number;
      rowNumber: number;
      columnNumber: number;
    }
  ) {
    const repeatGroup = new TooyeaRepeatGroup(
      targetElement,
      options,
      this.updateCanvas.bind(this),
      this._paste.bind(this)
    );
    await repeatGroup.initGroup();
    this.fabricCanvas.add(repeatGroup.group);
    this.fabricCanvas.remove(targetElement);
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
