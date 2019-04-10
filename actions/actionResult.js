// const { log } = require('../util/log');
const { getScreenShotFileName } = require('../util/util');

async function actionResult(action, resultStatus = 'Done') {
  const result = { ...action };
  result.resullt = resultStatus;
  result.screenShot = getScreenShotFileName(action);
}

module.exports.actionResult = actionResult;
