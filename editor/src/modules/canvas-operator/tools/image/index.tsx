import { useStore } from "@/store";
import style from "./index.module.less";
import { IconApps, IconMore } from "@douyinfe/semi-icons";
import { Tooltip, Tag } from "@douyinfe/semi-ui";

// 图片工具
export function ImageTool() {
  const { store } = useStore();
  const { currentElements, currentOperator } = store.common;

  function getImageList() {
    return (currentElements as fabric.Object[])
      ?.filter((x) => x.type === "image")
      .map((v) => ({
        src: v.getSrc(),
        width: v.width,
        height: v.height,
        target: v,
      }));
  }

  // 根据 img 平铺重复
  function handleRepeat(target: fabric.Object) {
    currentOperator?.createRepeatGroupFromElement(target, {
      rowGap: 40,
      columnGap: 40,
      rowNumber: 20,
      columnNumber: 10,
    });
  }

  return (
    <div className={style.imageTool}>
      {getImageList().map(({ target, ...img }, i) => (
        <ImageInfoItem
          key={`ImageInfoItem__${i}`}
          {...img}
          onClick={() => {
            currentOperator!.fabricCanvas.absolutePan({ x: 0, y: 0 });
            currentOperator!.fabricCanvas.setActiveObject(target);
          }}
          onRepeatClick={() => {
            handleRepeat(target);
          }}
        />
      ))}
    </div>
  );
}

function ImageInfoItem({ src, width, height, onClick, onRepeatClick }: any) {
  return (
    <div className={style.imageInfoItem} onClick={onClick}>
      <div>
        <img src={src} alt="img" width="32" />
        <Tag size="small" color="blue" type="solid" shape="circle">
          平铺
        </Tag>
        {`${width}px * ${height}px`}
      </div>
      <div>
        <Tooltip content={"平铺重复"}>
          <IconApps onClick={onRepeatClick} />
        </Tooltip>
        <IconMore />
      </div>
    </div>
  );
}
