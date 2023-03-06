import { Tabs, TabPane, Card } from "@douyinfe/semi-ui";
import { ToolsBar } from "./tools";
import "./index.less";

interface CanvasOperatorProps {
  className?: string;
}

export function CanvasOperator({ className }: CanvasOperatorProps) {
  return (
    <div className={className}>
      <Tabs type="line" className="canvas-operator">
        <TabPane tab={<div className="tab-card">上衣</div>} itemKey="1">
          <div id="tooyea-canvas" className="canvas-panel" />
        </TabPane>
        <TabPane tab={<div className="tab-card">裤子</div>} itemKey="2">
          <div id="tooyea-canvas2" className="canvas-panel" />
        </TabPane>
      </Tabs>
      <ToolsBar className="canvas-tools" />
    </div>
  );
}
