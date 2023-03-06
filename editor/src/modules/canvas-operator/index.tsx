import { Tabs, TabPane, Card } from "@douyinfe/semi-ui";
import { ToolsBar } from "./tools";
import "./index.less";
import { useStore } from "@/store";

interface CanvasOperatorProps {
  className?: string;
}

export function CanvasOperator({ className }: CanvasOperatorProps) {
  const { store, actions } = useStore();
  const { meshTextures } = store.common;
  const { setCurrentOperator, setCurrentElements } = actions.common;

  function onTabClick(index: string) {
    const operator = meshTextures[Number(index)][0].getCanvasOperator();
    setCurrentOperator(operator);
    setCurrentElements(operator.elements);
  }

  return (
    <div className={className}>
      <Tabs type="line" className="canvas-operator" onTabClick={onTabClick}>
        <TabPane tab={<div className="tab-card">上衣</div>} itemKey="0">
          <div id="tooyea-canvas" className="canvas-panel" />
        </TabPane>
        <TabPane tab={<div className="tab-card">裤子</div>} itemKey="1">
          <div id="tooyea-canvas2" className="canvas-panel" />
        </TabPane>
      </Tabs>
      <ToolsBar className="canvas-tools" />
    </div>
  );
}
