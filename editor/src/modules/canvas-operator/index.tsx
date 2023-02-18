import { Tabs, TabPane } from "@douyinfe/semi-ui";
import "./index.less";

interface CanvasOperatorProps {
  className?: string;
}

export function CanvasOperator({ className }: CanvasOperatorProps) {
  return (
    <Tabs type="line" className={`canvas-operator ${className}`}>
      <TabPane tab={<div className="tab-card">上衣</div>} itemKey="1">
        <div id="all-canvas" className="canvas-panel"></div>
      </TabPane>
      <TabPane tab={<div className="tab-card">裤子</div>} itemKey="2">
        <div id="all-canvas2" className="canvas-panel"></div>
      </TabPane>
    </Tabs>
  );
}
