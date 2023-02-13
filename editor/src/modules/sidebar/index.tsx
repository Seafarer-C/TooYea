import { Tabs, TabPane } from "@douyinfe/semi-ui";
import { IconShoppingBag, IconColorPalette } from "@douyinfe/semi-icons";
import "./index.css";

export function SideBar() {
  return (
    <Tabs className="side-bar" type="card">
      <TabPane
        tab={
          <div className="tab-card">
            <IconShoppingBag />
            商品
          </div>
        }
        itemKey="1"
      >
        商品
      </TabPane>
      <TabPane
        tab={
          <div className="tab-card">
            <IconColorPalette />
            设计
          </div>
        }
        itemKey="2"
      >
        设计
      </TabPane>
    </Tabs>
  );
}
