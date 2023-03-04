import { TooyeaEditor } from "@tooyea/engine";
// import { GltfLoader } from "./loaders/gltf-loader";
import { ObjLoader } from "./loaders/obj-loader";
import { EditorStateConfig, defaultState } from "./state";

export const editor = new TooyeaEditor<EditorStateConfig>(
  defaultState
).addLoaders([ObjLoader]);

export async function initEditor() {
  editor.mount("webgl", {
    width: 400,
    height: 400,
  });
  const { meshes, meshTextures } = await editor.load(
    {
      format: "obj",
      fileSrc: "football/model2.obj",
      textureImageArrays: [
        [
          {
            overlayImageSrc: "football/top.png",
            backgroundColor: "#ff6a1f",
          },
        ],
      ],
      position: [0, -80, -30],
    },
    [["all-canvas"]]
  );
  editor.load(
    {
      format: "obj",
      fileSrc: "kuzi/model.obj",
      textureImageArrays: [
        [
          {
            overlayImageSrc: "kuzi/top.png",
            backgroundColor: "#ff6a1f",
          },
        ],
      ],
      position: [0, -100, -30],
    },
    [["all-canvas2"]]
  );
}
