import { editor, initEditor } from "@/editor";
import { useStore } from "@/store";
import { Toast } from "@douyinfe/semi-ui";
import { useEffect } from "react";

export const useInit = async () => {
  const { store, actions } = useStore();
  //   const { meshTextures, currentOperator } = store.common;
  const { setMeshTextures, setCurrentOperator, setCurrentElements } =
    actions.common;

  useEffect(() => {
    (async () => {
      editor.mount("webgl", {
        width: 400,
        height: 400,
      });

      const res = await initEditor(
        [
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
        ],
        ["tooyea-canvas", "tooyea-canvas2"]
      );
      const mts = res.map((v) => v.meshTextures);
      const operator = mts[0][0].getCanvasOperator();

      setMeshTextures(mts);
      setCurrentOperator(operator);
      setCurrentElements(operator!.elements);

      //   operator?.setBackgroundColor("#aaaaff");

      Toast.success({ content: "welcome" });
    })();
  }, []);
};
