import {
  INIT_OBJ_LEFT_FILES,
  ADD_OBJ_LEFT_FILE,
  UPDATE_OBJ_LEFT_FILE,
  DELETE_OBJ_LEFT_FILE,
  INIT_OBJ_RIGHT_FILES,
  RECOVER_OBJ_RIGHT_FILES,
  CHANGE_MODULE_TYPE,
  UPDATE_CURRENT_FILE_DETAIL,
  RECOVER_CURRENT_FILE_DETAIL,
  ADD_COMPONENT_IN_CURRENT_FILE,
  DELETE_COMPONENT_IN_CURRENT_FILE,
  UPDATE_COMPONENT_IN_CURRENT_FILE,
} from './actionTypes';

export const initOBJLeftFiles = (componentFilesList) => ({
  type: INIT_OBJ_LEFT_FILES,
  objFiles: {...componentFilesList},
})
export const initOBJRightFiles = (componentFilesList) => ({
  type: INIT_OBJ_RIGHT_FILES,
  objFiles: [...componentFilesList],
})
export const recoverOBJRightFiles = () => ({
  type: RECOVER_OBJ_RIGHT_FILES,
  objFiles: [],
})

export const addOBJLeftFile = (newComponentFile) => ({
  type: ADD_OBJ_LEFT_FILE,
  objFile: {[newComponentFile.currentIndex]: newComponentFile.objFile},
  nextIndex: newComponentFile.nextIndex,
})

export const updateOBJLeftFile = (componentFile) => ({
  type: UPDATE_OBJ_LEFT_FILE,
  objFile: componentFile,
})

export const deleteOBJLeftFile = (keysList) => ({
  type: DELETE_OBJ_LEFT_FILE,
  keysList,
})

export const changeModule = (currentModel) => ({
  type:CHANGE_MODULE_TYPE,
  currentModel,
})

export const updateCurrentFileDetail = (cunrrentFileDetail) => ({
  type: UPDATE_CURRENT_FILE_DETAIL,
  cunrrentFileDetail: {
    ...cunrrentFileDetail,
  },
});
export const recoverCurrentFileDetail = () => ({
  type: RECOVER_CURRENT_FILE_DETAIL,
  cunrrentFileDetail: {},
});

export const addComponentInCurrentFile = (key,newComponent) => ({
  type:ADD_COMPONENT_IN_CURRENT_FILE,
  newComponent:{[key]:newComponent},
})
export const updateComponentInCurrentFile = (key,newComponent) => ({
  type:UPDATE_COMPONENT_IN_CURRENT_FILE,
  newComponent:{[key]:newComponent},
})
export const deleteComponentInCurrentFile = (key) => ({
  type:DELETE_COMPONENT_IN_CURRENT_FILE,
  delKey:[...key],
})