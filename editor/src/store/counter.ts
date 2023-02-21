import { observable, action, computed } from "mobx";

export class CounterStore {
  @observable counter = 1;
  @computed get doubleCounter() {
    return this.counter * 2;
  }
  @action add() {
    console.log(this);
    this.counter++;
  }
}
