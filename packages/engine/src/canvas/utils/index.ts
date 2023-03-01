import { fabric } from "fabric";

// 根据图片 URL 获取图片资源
export async function asyncGetImageFromURL(
  imgSrc: string
): Promise<fabric.Image> {
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

// 拷贝元素
export async function asyncClone(
  clipboard: fabric.Object
): Promise<fabric.Object> {
  return new Promise((resolve, reject) => {
    try {
      clipboard.clone((clonedObj) => {
        resolve(clonedObj);
      });
    } catch (err) {
      reject(err);
    }
  });
}
