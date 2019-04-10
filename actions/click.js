const { getScreenShotFileName } = require('../util/util');
const { log } = require('../util/log');
const { getObjectByXpath } = require('./getObject');
const { takeScreenShot } = require('./takeScreenShot');
const { actionResult } = require('./actionResult');

async function actionClick(action) {
  log.debug('actionClick start', action.description);
  const targetObject = await getObjectByXpath(action.page, action.objectXpath);
  await targetObject.click();
  await takeScreenShot(action.page, getScreenShotFileName(action));
  log.debug('actionClick end', action.description);
  return actionResult(action);
}

module.exports.actionClick = actionClick;
