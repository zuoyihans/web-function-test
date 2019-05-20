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
} from '../actionTypes';

import _ from 'lodash';

const initialState = {
  objLeftFiles: {},
  objRightFiles: {},
  componentFiles: {},
  executionFiles: {},
  cunrrentFileDetail: {},
  currentModel: 'component',
  currentIndex: '',
};

// return a new state using the action and dispatch it.
// Redux will dispatch the new stat underwater.
export default function(state=initialState, action) {
  switch (action.type) {
    case INIT_OBJ_LEFT_FILES: {
      return {
        ...state,
        objLeftFiles: {...action.objFiles},
        currentIndex: Object.keys(action.objFiles).length,
      }
    }
    case ADD_OBJ_LEFT_FILE: {
      return {
        ...state,
        objLeftFiles: {...state.objLeftFiles, ...action.objFile},
        currentIndex: action.nextIndex,
      }
    }
    case UPDATE_OBJ_LEFT_FILE: {
      return {
        ...state,
        objLeftFiles: {...state.objLeftFiles, ...action.objFile},
      }
    }
    case DELETE_OBJ_LEFT_FILE: {
      return {
        ...state,
        objLeftFiles: _.omit(state.objLeftFiles, action.keysList),
      }
    }
    case INIT_OBJ_RIGHT_FILES: {
      return {
        ...state,
        objRightFiles: {...action.objFiles},
      }
    }
    case RECOVER_OBJ_RIGHT_FILES: {
      return {
        ...state,
        objRightFiles: {},
      }
    }
    case UPDATE_CURRENT_FILE_DETAIL: {
      return {
        ...state,
        cunrrentFileDetail: {
          ...action.cunrrentFileDetail,
        }
      }
    }
    case RECOVER_CURRENT_FILE_DETAIL: {
      return {
        ...state,
        cunrrentFileDetail: {}
      }
    }
    case CHANGE_MODULE_TYPE: {
      return {
        ...state,
        currentModel: action.currentModel,
      }
    }
    // case CREATE_COMPONENT_FILE: {
    //   return {
    //     ...state,
    //     componentFiles: { ...state.componentFiles, action.componentFile}
    //   }
    // }
    default: {
      return state;
    }
  }
}
