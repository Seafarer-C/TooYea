import { Input, Button } from "@douyinfe/semi-ui";
import {
  IconPlus,
  IconMinus,
  IconImageStroked,
  IconTextStroked,
  IconFillStroked,
  IconEditStroked,
} from "@douyinfe/semi-icons";
import "./index.less";
import { useState } from "react";
import { ImageTool } from "./image";

interface ToolsBarProps {
  className?: string;
}
type ActiveToolKey = "image" | "text" | "background" | "paint";

interface MainTool {
  key: ActiveToolKey;
  title: string;
  icon: JSX.Element;
  onClick: () => void;
}

export function ToolsBar({ className }: ToolsBarProps) {
  // 当前使用的工具
  const [activeToolKey, setActiveToolKey] = useState<ActiveToolKey | null>();
  // 弹出层组件
  const [popover, setPopover] = useState<JSX.Element>(<></>);

  function clearPopover() {
    setActiveToolKey(null);
    setPopover(<></>);
  }
  // 工具组
  const mainTools: Array<MainTool> = [
    {
      title: "图片",
      key: "image",
      icon: <IconImageStroked />,
      onClick: () => {
        if (activeToolKey === "image") {
          clearPopover();
        } else {
          setActiveToolKey("image");
          setPopover(
            <div className="tools-bar-popover">
              <ImageTool />
            </div>
          );
        }
      },
    },
    {
      title: "背景",
      key: "background",
      icon: <IconFillStroked />,
      onClick: () => {
        if (activeToolKey === "background") {
          clearPopover();
        } else {
          setActiveToolKey("background");
          setPopover(<div className="tools-bar-popover">背景图</div>);
        }
      },
    },
    {
      title: "文本",
      key: "text",
      icon: <IconTextStroked />,
      onClick: () => {
        if (activeToolKey === "text") {
          clearPopover();
        } else {
          setActiveToolKey("text");
          setPopover(<div className="tools-bar-popover">文本</div>);
        }
      },
    },
    {
      title: "涂鸦",
      key: "paint",
      icon: <IconEditStroked />,
      onClick: () => {},
    },
  ];

  return (
    <div className={`${className} tools-bar-wrapper`}>
      <div className={`tools-bar-content`}>
        {popover}
        <div className="tools-bar">
          {mainTools.map(({ title, key, icon, onClick }) => (
            <div
              key={key}
              onClick={onClick}
              className={`tool-item ${
                activeToolKey === key ? "tool-item_active" : ""
              }`}
            >
              {icon}
              <span className="tool-item_title">{title}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="zoom-in-out-bar">
        <Button size="small" icon={<IconMinus />} aria-label="缩小" />
        <Input size="small" style={{ margin: "0 10px", width: "60px" }} />
        <Button size="small" icon={<IconPlus />} aria-label="放大" />
      </div>
    </div>
  );
}
