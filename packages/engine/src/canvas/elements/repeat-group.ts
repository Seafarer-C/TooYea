import { fabric } from "fabric";
// import {} from "";

export class TooyeaRepeatGroup {
  constructor(target, options = {}, update, paste) {
    this.repeatTarget = target;
    this.updateCanvas = update;
    this.pasteElement = paste;
    Object.keys(options).forEach((key) => {
      this[key] = options[key];
    });
  }

  // 重复的对象
  repeatTarget: fabric.Object;
  // 组
  group: fabric.Group;

  // 行间距
  rowGap: number = 20;
  // 列间距
  columnGap: number = 20;
  // 行数
  rowNumber: number = 5;
  // 列数
  columnNumber: number = 5;
  // 元素缩放比
  elementScale: number = 1;

  // 更新画布
  updateCanvas: Function;
  // 复制元素
  pasteElement: (
    clipboard: fabric.Object,
    offset: {
      x: number;
      y: number;
    }
  ) => Promise<fabric.Object>;

  async initGroup() {
    const pasteElements = [];
    for (let row = 0; row < this.rowNumber; row++) {
      for (let col = 0; col < this.columnNumber; col++) {
        pasteElements.push(
          await this.pasteElement(this.repeatTarget, {
            x: row * this.rowGap,
            y: col * this.columnGap,
          })
        );
      }
    }
    this.group = new fabric.Group(pasteElements, {
      // 可以操控子元素
      subTargetCheck: true,
    });
    this.group.on("mousedown", (evt) => {
      console.log(evt);
      // 控制子元素
      console.log(evt.subTargets);
    });
  }
}
