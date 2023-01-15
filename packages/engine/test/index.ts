import { TooyeaEditor, TooyeaEditorOptions, TooyeaLoader } from "../src";
import { LifeCycleEnum } from "../src/constants";

class AConfig extends TooyeaEditorOptions {
  a: number;
}
const editor = new TooyeaEditor<AConfig>({
  a: 1,
  lightConfig: {},
  cameraConfig: {},
});

class ALoader extends TooyeaLoader<AConfig> {
  name = "a11";

  test() {
    this.state.a = 100;
  }
}
editor.addLoaders([ALoader]);

console.log(editor.loaders[0].name);

console.log(editor.state);
editor.loaders[0]?.test();

console.log(editor.state);
editor.onCreated((vm) => {
  console.log(vm, "cbbb");
  return true;
});

// editor.lifeCycleCallbacks.get(LifeCycleEnum.CREATED)(editor);
