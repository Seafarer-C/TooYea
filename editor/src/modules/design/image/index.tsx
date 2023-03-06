import { useStore } from "@/store";
import "./index.less";

export function ImageDesign() {
  const { store, actions } = useStore();
  const { currentOperator } = store.common;
  const { setCurrentElements } = actions.common;

  const imgList = [
    {
      src: "vite.svg",
    },
    {
      src: "logo.png",
    },
    {
      src: "react.svg",
    },
    {
      src: "react.svg",
    },
    {
      src: "vite.svg",
    },
    {
      src: "logo/Cleveland_Cavaliers.png",
    },
  ];

  function addImageToCurrentCanvas(imgSrc: string) {
    currentOperator?.addImage(imgSrc);
    setCurrentElements(currentOperator?.elements);
  }

  return (
    <div className="design-panel-image">
      {imgList.map((img, i) => (
        <img
          src={img.src}
          width={100}
          key={"img__" + i}
          onClick={(e) => addImageToCurrentCanvas(img.src)}
        />
      ))}
    </div>
  );
}
