const { log } = require('../util/log');
const { getScreenShotFileName } = require('../util/util');

async function actionResult(action, resultStatus = 'Done') {
  const result = { ...action };
  result.resullt = resultStatus;
  result.screenShot = getScreenShotFileName(action);
  delete result.page;
  log.debug('action result', JSON.stringify(result));
  return result;
}

module.exports.actionResult = actionResult;
