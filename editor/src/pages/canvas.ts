import * as THREE from "three";

import { editor } from "../editor";

export const canvas = document.createElement("canvas");
canvas.style.position = "fixed";
canvas.style.top = "0";
canvas.style.left = "0px";
canvas.width = 698;
canvas.height = 698;
canvas.style.width = "500px";
canvas.style.height = "500px";
canvas.style.backgroundColor = "#fff";
document.body.appendChild(canvas);

export const texture = new THREE.CanvasTexture(canvas);

const ctx = canvas.getContext("2d");

const img = new Image();
img.src = "football/下载.png";

img.onload = () => {
  ctx?.drawImage(img, 0, 0);

  const img2 = new Image();
  img2.src = "vite.svg";
  img2.onload = () => {
    ctx?.drawImage(img2, 170, 130, 40, 40);
    texture.needsUpdate = true;
    editor.render();
  };
};
