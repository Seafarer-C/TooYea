import { TooyeaEditor } from "@tooyea/engine";
import { Tooyea3DFileInfoModel } from "@tooyea/types";
// import { GltfLoader } from "./loaders/gltf-loader";
import { ObjLoader } from "./loaders/obj-loader";
import { EditorStateConfig, defaultState } from "./state";

export const editor = new TooyeaEditor<EditorStateConfig>(
  defaultState
).addLoaders([ObjLoader]);

export async function initEditor(
  files: Array<Tooyea3DFileInfoModel>,
  canvasEls: Array<string>
) {
  const res = await Promise.all(
    files.map((file, index) => editor.load(file, [[canvasEls[index]]]))
  );
  return res;
}
