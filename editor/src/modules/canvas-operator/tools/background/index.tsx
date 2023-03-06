import style from "./index.module.less";
import { SketchPicker } from "react-color";
import { useState } from "react";
import { useStore } from "@/store";

export function BackgroundTool() {
  const { store } = useStore();
  const { currentOperator } = store.common;
  const [color, setColor] = useState("#ffffff");

  function handleChange(color) {
    currentOperator?.setBackgroundColor(color.hex);
    setColor(color.hex);
  }

  return (
    <div className={style.backgroundTool}>
      <SketchPicker color={color} onChange={handleChange} />
    </div>
  );
}
