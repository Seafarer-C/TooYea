<template>
  <div>
    <canvas id="canvas" width="1000" height="1000" />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";

import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";

import { editor } from "../editor";
import { texture } from "./canvas";

onMounted(() => {
  // var loader = new OBJLoader(); //obj加载器

  // loader.load("football/model2.obj", function (obj) {
  //   // 直接使用 texture 进行贴图
  //   obj.children[0].material.forEach((element) => {
  //     element.map = texture;
  //   });

  //   obj.scale.set(3, 3, 3); //放大obj组对象
  //   obj.position.set(50, -450, 0);
  //   obj.rotation.set(0, 0, 0);
  //   editor.scene.add(obj); //返回的组对象插入场景中
  //   editor.mount("canvas");
  //   console.log("物体", obj);
  // });
  editor.mount("canvas");
  editor.load(
    {
      format: ".obj",
      meshSrc: "football/model2.obj",
      scale: [3, 3, 3],
      textureSrcs: [],
      rotation: [0, 0, 0],
    },
    texture
  );
});
</script>

<style scoped></style>
