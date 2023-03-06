import style from "./index.module.less";

export function PaintTool() {
  return (
    <div className={style.paintTool}>
      <img
        src="pan/pan1.svg"
        width={30}
        style={{
          left: "20px",
        }}
      />
      <img
        src="pan/pan2.svg"
        width={50}
        style={{
          left: "60px",
        }}
      />
      <img
        src="pan/pan3.svg"
        width={50}
        style={{
          left: "120px",
        }}
      />
    </div>
  );
}
