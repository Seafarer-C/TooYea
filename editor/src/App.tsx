import { useEffect } from "react";
import "./App.less";
import { editor, initEditor } from "@/editor";
import { Toast } from "@douyinfe/semi-ui";
import { Nav } from "./components/nav";

import { SideBar } from "./modules/sidebar";
import { CanvasOperator } from "./modules/canvas-operator";
import { RightPanel } from "./modules/right-panel";

function App() {
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

      const { meshTextures } = res[0];

      const operator = meshTextures[0].getCanvasOperator();
      await operator?.addImage("vite.svg");
      operator?.createRepeatGroupFromElement(operator.elements[0], {
        rowGap: 40,
        columnGap: 40,
        rowNumber: 20,
        columnNumber: 10,
      });

      Toast.success({ content: "welcome" });
    })();
  }, []);

  return (
    <>
      <Nav className="Nav" />
      <div className="App">
        <SideBar className="SideBar" />
        <CanvasOperator className="CanvasOperator" />
        <RightPanel
          className="right-panel"
          modelScene={<canvas id="webgl" className="three-container" />}
        ></RightPanel>
      </div>
    </>
  );
}

export default App;
