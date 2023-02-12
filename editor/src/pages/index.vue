<template>
  <div>
    <canvas id="canvas" width="1000" height="1000" />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";

import { editor } from "../editor";
import { canvas } from "./canvas";

onMounted(async () => {
  editor.mount("canvas");
  const { meshes, meshTextures } = await editor.load(
    {
      format: "obj",
      fileSrc: "football/model2.obj",
      textureImageArrays: [
        [
          {
            overlayImageSrc: "football/top.png",
            backgroundColor: "#67111a",
          },
        ],
      ],
      position: [50, -70, 0],
    },
    [[canvas]]
  );
  editor.load(
    {
      format: "obj",
      fileSrc: "kuzi/model.obj",
      textureImageArrays: [
        [
          {
            overlayImageSrc: "kuzi/top.png",
            backgroundColor: "#67111a",
          },
        ],
      ],
      position: [50, -95, 0],
    },
    [[canvas]]
  );
  editor.load(
    {
      format: "obj",
      fileSrc: "football/model3.obj",
      textureImageArrays: [
        [
          {
            backgroundColor: "#67111a",
          },
        ],
      ],
      position: [50, -140, 0],
    },
    [[canvas]]
  );
  console.log("load 相关信息a🤯", meshes, meshTextures[0].getCanvasOperator());
  const operator = meshTextures[0].getCanvasOperator();
  operator?.addImage("logo/Cleveland_Cavaliers.png");
  // editor.load(
  //   {
  //     format: "gltf",
  //     fileSrc: "woman-clothing.glb",
  //     scale: [30, 30, 30],
  //     textureSrcArrays: [["football/下载.png"]],
  //     rotation: [0, 0, 0],
  //   },
  //   [[canvas]]
  // );
});
</script>

<style>
#all-canvas {
  height: 100vh;
  overflow-y: auto;
  position: fixed;
  top: 0;
  left: 0;
  width: 500px;
  background-color: #fff;
}
.canvas-container {
  width: 500px !important;
  height: 500px !important;
}
.canvas-container canvas {
  width: 500px !important;
  height: 500px !important;
}
</style>
