import { Tabs, TabPane, Empty, Button } from "@douyinfe/semi-ui";
import { IconShoppingBag, IconColorPalette } from "@douyinfe/semi-icons";
import "./index.less";
import { DesignModule } from "../design";
import { useStores } from "../../store/hooks";

interface SideBarProps {
  className?: string;
}

export function SideBar({ className }: SideBarProps) {
  const { counterStore } = useStores();
  return (
    <Tabs className={`side-bar ${className}`} defaultActiveKey={"2"}>
      <TabPane
        tab={
          <div className="tab-card">
            <IconShoppingBag />
            商品
          </div>
        }
        itemKey="1"
      >
        <Empty
          title={"功能建设中"}
          description="当前功能暂未开放，敬请期待。"
        />
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
        {counterStore.counter}
        <Button onClick={counterStore.add}>add</Button>
        <DesignModule />
      </TabPane>
    </Tabs>
  );
}
