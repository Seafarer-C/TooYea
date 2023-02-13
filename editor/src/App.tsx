import { useState, useRef, useEffect } from "react";
import "./App.css";
import { editor } from "./editor";
import { Card, Toast } from "@douyinfe/semi-ui";

import { SideBar } from "./modules/sidebar";

function App() {
  useEffect(() => {
    (async () => {
      editor.mount("webgl", {
        width: 600,
        height: 600,
      });
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
                backgroundColor: "#67111a",
              },
            ],
          ],
          position: [50, -95, 0],
        },
        [["all-canvas"]]
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
        [["all-canvas"]]
      );
      const operator = meshTextures[0].getCanvasOperator();
      operator?.addImage("logo/Cleveland_Cavaliers.png");
      Toast.success({ content: "welcome" });
    })();
  }, []);

  return (
    <div className="App">
      <SideBar />
      <div id="all-canvas"></div>
      <Card>
        <canvas
          id="webgl"
          width="1000"
          height="1000"
          className="ThreeContainer"
        />
      </Card>
    </div>
  );
}

export default App;
