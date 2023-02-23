import { Collapse, Button } from "@douyinfe/semi-ui";
import { IconComponent, IconImage, IconText } from "@douyinfe/semi-icons";
import { useStore } from "../../store";
import "./index.less";

// 模块类型
type CollapseType = "style" | "image" | "text";

interface ICollapseItem {
  title: String;
  key: CollapseType;
  icon: JSX.Element;
  panel: JSX.Element;
}

// 设计工具面板
export function DesignModule() {
  const { state, dispatch } = useStore();

  const collapseItems: ICollapseItem[] = [
    {
      icon: <IconComponent />,
      title: "整体风格",
      key: "style",
      panel: <></>,
    },
    {
      icon: <IconImage />,
      title: "图片素材",
      key: "image",
      panel: <></>,
    },
    {
      icon: <IconText />,
      title: "文字素材",
      key: "text",
      panel: <></>,
    },
  ];

  return (
    <>
      <Collapse keepDOM defaultActiveKey={["style"]}>
        {collapseItems.map((item) => (
          <Collapse.Panel
            header={
              <span className="collapse-item-header">
                {item.icon}
                {item.title}
              </span>
            }
            itemKey={item.key}
          >
            <>{item.panel}</>
          </Collapse.Panel>
        ))}
      </Collapse>
    </>
  );
}
