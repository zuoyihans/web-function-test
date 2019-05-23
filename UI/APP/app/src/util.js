export const httpRequest = (data, url, method, cb)=> {
  fetch(url, {
    body: JSON.stringify(data),
    method,
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, same-origin, *omit
    headers: {
      'user-agent': 'Mozilla/4.0 MDN Example',
      'content-type': 'application/json'
    },
    mode: 'cors', // no-cors, cors, *same-origin
    redirect: 'follow', // manual, *follow, error
    referrer: 'no-referrer', // *client, no-referrer
  })
  .then(response => console.log(response))
  .then(() => cb())
};

// @parm link 获取文件名的url
// @return  文件名字的list。
export const queryFileList = (link) => {
  return fetch(link)
    .then(response => response.json())
    .then(
      sauce => {
        const { queryFolder, queryfiles } = sauce;
        return queryfiles.map((x) => ({fileName: x, folder: queryFolder}));
      },
      err => {console.log(err)}
    )
};

// @parm url
// @return  json。
export const queryReturnJson = (link) => {
  return fetch(link)
    .then(
      response => response.json()
    )
    .then(
      sauce => {return sauce},
      err => {console.log(err)}
    )
};

export const queryFileDetail = (link) => {
  return fetch(link)
    .then(
      response => response.json(),
      err => {console.log(err)}
    )
};

export const queryFileListBackup = (link, cb) => {
  return dispatch => {
    return fetch(link)
    .then(response => response.json())
    .then(
      sauce => {
        const { componentFolder, componentfiles } = sauce;
        const componentFilesList = [];
        for (let i=0; i<componentfiles.length; i++) {
          componentFilesList.push({
            fileName: componentfiles[i],
            folder: componentFolder,
          });
        };
        dispatch(cb(componentFilesList))
      },
      // sauce => console.log(sauce),
      err => {console.log(err)}
    )
  }
};