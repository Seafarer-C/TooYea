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
      scale: [3, 3, 3],
      textureSrcArrays: [["football/下载.png"]],
      position: [50, -450, 0],
    },
    [[canvas]]
  );
  // editor.load(
  //   {
  //     format: "gltf",
  //     fileSrc: "woman-clothing.glb",
  //     scale: [30, 30, 30],
  //     textureSrcArrays: [],
  //     rotation: [0, 0, 0],
  //   },
  //   texture
  // );
});
</script>

<style scoped></style>
