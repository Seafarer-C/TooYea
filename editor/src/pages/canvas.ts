export const canvas = document.createElement("canvas");
canvas.style.position = "fixed";
canvas.style.top = "0";
canvas.style.left = "900px";
canvas.width = 698;
canvas.height = 698;
canvas.style.width = "300px";
canvas.style.height = "300px";
canvas.style.backgroundColor = "#fff";
document.body.appendChild(canvas);

const ctx = canvas.getContext("2d");

const img = new Image();
img.src = "football/下载.png";

img.onload = () => {
  ctx?.drawImage(img, 0, 0);
  console.log(img.width, img.height);

  ctx.fillStyle = "red";
  ctx.fillRect(160, 120, 50, 50);
};
