<template>
  <div>
    <canvas id="canvas" width="1000" height="1000" />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";

import { editor } from "../editor";
import { canvas } from "./canvas";

onMounted(() => {
  editor.mount("canvas");
  editor.load(
    {
      format: "obj",
      fileSrc: "football/model2.obj",
      textureImageArrays: [
        [
          {
            overlayImageSrc: "football/top.png",
            backgroundImageSrc: "background/b.png",
            backgroundColor: "black",
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
            backgroundColor: "blue",
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
            backgroundColor: "blue",
          },
        ],
      ],
      position: [50, -140, 0],
    },
    [[canvas]]
  );
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

<style scoped></style>
