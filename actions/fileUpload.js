const { getScreenShotFileName } = require('../util/util');
const { takeScreenShot } = require('./takeScreenShot');
const { getObjectByXpath } = require('./getObject');
const { log } = require('../util/log');
const { actionResult } = require('./actionResult');

async function actionFileUpload(action) {
  log.debug('actionFileUpload start', JSON.stringify(action.description));
  const { object } = await getObjectByXpath(action);
  object.uploadFile(action.actionParam);
  await takeScreenShot(action.page, getScreenShotFileName(action));
  log.debug('actionFileUpload end');
  return actionResult(action);
}

module.exports.actionFileUpload = actionFileUpload;
