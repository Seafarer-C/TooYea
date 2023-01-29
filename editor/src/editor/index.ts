import { TooyeaEditor } from '@tooyea/engine';

import { ObjLoader } from './loaders/obj-loader';
import { StateConfig } from './state';

export const editor = new TooyeaEditor<StateConfig>({
  sceneConfig: {},
  lightConfig: {},
  cameraConfig: {},
}).addLoaders([ObjLoader]);
