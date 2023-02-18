import "./index.less";

interface RightPanelProps {
  className?: string;
  modelScene: JSX.Element;
}

export function RightPanel({ modelScene, className }: RightPanelProps) {
  return <div className={`tooyea-right-panel ${className}`}>{modelScene}</div>;
}
