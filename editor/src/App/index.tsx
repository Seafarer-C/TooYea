import "./App.less";
import { Nav } from "@/components/nav";

import { SideBar } from "@/modules/sidebar";
import { CanvasOperator } from "@/modules/canvas-operator";
import { RightPanel } from "@/modules/right-panel";
import { useInit } from "./init";

function App() {
  useInit();

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
