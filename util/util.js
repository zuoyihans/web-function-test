const fs = require('fs');
const format = require('string-format');

const { log } = require('./log');

function readJsonFile(filepath) {
  // log.debug('readJsonFile', filepath);
  const filecontent = fs.readFileSync(filepath, 'utf-8');
  // log.debug('filecontent', filecontent);
  const jsondata = JSON.parse(filecontent);
  // log.debug('jsondata', JSON.stringify(jsondata));
  return jsondata;
}

function getCasefilelist(files) {
  const casefiles = [];
  files.forEach((file) => {
    if (file.startsWith('case') && file.endsWith('.json')) {
      casefiles.push(file);
    }
  });
  return casefiles;
}

function getScreenShotFileName(action) {
  return `${action.config.outputFolder}/${action.caseid}-${action.componentidx.toString().padStart(3, '0')}-${action.actionidx.toString().padStart(3, '0')}.png`;
}

function param2Value(ukey, action, params) {
  const replaceParam = { ...action };
  if (action.actionParam) {
    log.debug('param2Value => before ', action.actionParam);
    if (replaceParam.actionParam && replaceParam.actionParam.startsWith('P_')) {
      replaceParam.actionParam = params[ukey][replaceParam.actionParam];
      while (replaceParam.actionParam.startsWith('G_')) {
        replaceParam.actionParam = params[ukey][replaceParam.actionParam];
      }
    }
    log.debug('param2Value => after ', replaceParam.actionParam);
  }
  if (action.objectParams) {
    log.debug('param2Value(object) => before ', action.objectXpath);
    const objectParams = Object.keys(action.objectParams);
    objectParams.forEach((objectParam) => {
      replaceParam.objectParams[objectParam] = params[ukey][objectParam];
    });
    log.debug(replaceParam.objectParams);
    replaceParam.objectXpath = format(action.objectXpath, replaceParam.objectParams);
    log.debug('param2Value(object) => after ', replaceParam.objectXpath);
  }

  return replaceParam;
}

module.exports.readJsonFile = readJsonFile;
module.exports.getCasefilelist = getCasefilelist;
module.exports.getScreenShotFileName = getScreenShotFileName;
module.exports.param2Value = param2Value;
