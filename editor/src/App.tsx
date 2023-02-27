import { useState, useRef, useEffect } from "react";
import "./App.less";
import { editor } from "./editor";
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

      const operator = meshTextures[0].getCanvasOperator();
      await operator?.addImage("logo/Cleveland_Cavaliers.png");
      operator?.copy(operator.elements[0]);
      setTimeout(() => {
        operator?.copy(operator.elements[1]);
      }, 100);

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
