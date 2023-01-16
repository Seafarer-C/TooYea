<template>
  <div>
    <canvas id="canvas" width="1000" height="1000" />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";

import { editor } from "../editor";
import { canvas } from "./canvas";

onMounted(() => {
  var loader = new OBJLoader(); //obj加载器

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;

  loader.load("football/model2.obj", function (obj) {
    // 直接使用 texture 进行贴图
    obj.children[0].material.forEach((element) => {
      element.map = texture;
    });

    console.log("物体", obj);
    // obj.scale.set(0.2, 0.2, 0.2); //放大obj组对象
    obj.rotation.set(0, 0, 0);
    editor.scene.add(obj); //返回的组对象插入场景中
    editor.mount("canvas");
  });
});
</script>

<style scoped></style>
