const { getScreenShotFileName } = require('../util/util');
const { log } = require('../util/log');
const { getObjectByXpath } = require('./getObject');
const { takeScreenShot } = require('./takeScreenShot');
const { actionResult } = require('./actionResult');

async function actionHover(action) {
  log.debug('actionHover start', action.description);
  // 等待对象web元素
  await action.page.waitForXPath(action.objectXpath);
  const { object } = await getObjectByXpath(action);
  await object.hover();
  // 截屏
  await takeScreenShot(action.page, getScreenShotFileName(action));
  log.debug('actionHover end', action.description);
  return actionResult(action);
}

module.exports.actionHover = actionHover;
