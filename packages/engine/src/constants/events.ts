export enum EVENTS {
  RENDER, // 重新渲染
  ADD, // 添加模型
}

export type TooyeaEmit = (evtName: EVENTS, ...params) => void;
