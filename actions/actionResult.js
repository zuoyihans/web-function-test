const { log } = require('../util/log');
const { getScreenShotFileName } = require('../util/util');

async function actionResult(action, resultStatus = 'Done') {
  const result = { ...action };
  result.result = resultStatus;
  result.screenShot = getScreenShotFileName(action);
  delete result.page;
  delete result.config;
  delete result.actionidx;
  delete result.componentidx;
  delete result.caseid;
  log.debug('action result => ', resultStatus);
  return result;
}

module.exports.actionResult = actionResult;
