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
import { PaintTool } from "./paint";
import { BackgroundTool } from "./background";

interface ToolsBarProps {
  className?: string;
}
type ActiveToolKey = "image" | "text" | "background" | "paint";

interface MainTool {
  key: ActiveToolKey;
  title: string;
  icon: JSX.Element;
}

export function ToolsBar({ className }: ToolsBarProps) {
  // 当前使用的工具
  const [activeToolKey, setActiveToolKey] = useState<ActiveToolKey | null>();

  function clickToolItem(key: ActiveToolKey) {
    if (activeToolKey === key) {
      setActiveToolKey(null);
    } else {
      setActiveToolKey(key);
    }
  }
  // 工具组
  const mainTools: Array<MainTool> = [
    {
      title: "图片",
      key: "image",
      icon: <IconImageStroked />,
    },
    {
      title: "背景",
      key: "background",
      icon: <IconFillStroked />,
    },
    {
      title: "文本",
      key: "text",
      icon: <IconTextStroked />,
    },
    {
      title: "涂鸦",
      key: "paint",
      icon: <IconEditStroked />,
    },
  ];

  function getPopover() {
    switch (activeToolKey) {
      case "image":
        return (
          <div className="tools-bar-popover">
            <ImageTool />
          </div>
        );
      case "text":
        return <div className="tools-bar-popover">暂未开放</div>;
      case "background":
        return (
          <div className="tools-bar-popover">
            <BackgroundTool />
          </div>
        );
      case "paint":
        return <PaintTool />;
      default:
        return <></>;
    }
  }

  return (
    <div className={`${className} tools-bar-wrapper`}>
      <div className={`tools-bar-content`}>
        {getPopover()}
        <div className="tools-bar">
          {mainTools.map(({ title, key, icon }) => (
            <div
              key={key}
              onClick={() => clickToolItem(key)}
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
