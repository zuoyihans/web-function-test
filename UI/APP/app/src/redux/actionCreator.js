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

// export const refreshCurrentComponentFileAsync = (link) => {
//   return dispatch => {
//     return fetch(link)
//     .then(response => response.json())
//     .then(
//       sauce => {
//         sauce.link = link;
//         dispatch(refreshCurrentComponentFile(sauce));
//       },
//       err => {console.log(err)}
//     )
//   }
// }