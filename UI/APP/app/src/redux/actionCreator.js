import {
  REFRESH_COMPONENT_FILES,
  REFRESH_CURRENT_COMPONENT_FILE,
} from './actionTypes';

export const refreshComponentFiles = (componentFiles, idList) => ({
  type: REFRESH_COMPONENT_FILES,
  componentFiles: {...componentFiles},
  idList: [...idList],
});

export const refreshCurrentComponentFile = (cunrrentComponentFile) => ({
  type: REFRESH_CURRENT_COMPONENT_FILE,
  cunrrentComponentFile: {
    ...cunrrentComponentFile,
    actions:[...cunrrentComponentFile.actions]
  },
});

export const refreshComponentFileListAsync = (link) => {
  return dispatch => {
    return fetch(link)
    .then(response => response.json())
    .then(
      sauce => {
        const { componentFolder, componentfiles } = sauce;
        const componentFiles = {};
        const idList = [];
        for (let i=0; i<componentfiles.length; i++) {
          componentFiles[i]={
            id: "" + i,
            fileName: componentfiles[i],
            link: `http://localhost:3001/${componentFolder.slice(2)}/${componentfiles[i]}`,
          }
          idList.push("" + i);
        };
        dispatch(refreshComponentFiles(componentFiles, idList))
      },
      // sauce => console.log(sauce),
      err => {console.log(err)}
    )
  }
}

export const refreshCurrentComponentFileAsync = (link) => {
  return dispatch => {
    return fetch(link)
    .then(response => response.json())
    .then(
      sauce => {
        sauce.link = link;
        dispatch(refreshCurrentComponentFile(sauce));
      },
      err => {console.log(err)}
    )
  }
}