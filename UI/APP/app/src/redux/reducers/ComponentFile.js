import {
  REFRESH_COMPONENT_FILES,
  REFRESH_CURRENT_COMPONENT_FILE,
} from '../actionTypes';

const initialState = {
  componentFiles: {},
  idList: [],
  cunrrentComponentFile: {
    actions: [],
    description: "",
  },
};

// return a new state using the action and dispatch it.
// Redux will dispatch the new stat underwater.
export default function(state=initialState, action) {
  switch (action.type) {
    case REFRESH_COMPONENT_FILES: {
      return {
        ...state,
        componentFiles: {...action.componentFiles},
        idList: [...action.idList],
      }
    }
    case REFRESH_CURRENT_COMPONENT_FILE: {
      return {
        ...state,
        cunrrentComponentFile: {
          ...action.cunrrentComponentFile,
          actions: [...action.cunrrentComponentFile.actions]
        }
      }
    }
    default: {
      return state;
    }
  }
}
