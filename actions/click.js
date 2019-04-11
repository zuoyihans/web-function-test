const { getScreenShotFileName } = require('../util/util');
const { log } = require('../util/log');
const { getObjectByXpath } = require('./getObject');
const { takeScreenShot } = require('./takeScreenShot');
const { actionResult } = require('./actionResult');

async function actionClick(action) {
  log.debug('actionClick start', action.description);
  // 等待对象web元素
  await action.page.waitForXPath(action.objectXpath);
  const targetObject = await getObjectByXpath(action.page, action.objectXpath);
  await targetObject.click();
  // 等待请求完毕
  const finalResponse = await action.page.waitForResponse((response) => {
    log.debug('request invoked', response.url(), response.status());
    return true;
  });
  log.debug('all request done =>', finalResponse.ok());
  // 截屏
  await takeScreenShot(action.page, getScreenShotFileName(action));
  log.debug('actionClick end', action.description);
  return actionResult(action);
}

module.exports.actionClick = actionClick;
