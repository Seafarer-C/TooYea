import React from "react";
import { storesContext } from "./index";
import { CounterStore } from "./counter";

export const useStores = (): any => React.useContext(storesContext);

const counterStore = new CounterStore();
export const publicStores = () => ({
  // 各个模块的store分别引入
  counterStore,
});
