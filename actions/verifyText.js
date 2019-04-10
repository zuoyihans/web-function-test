const { getScreenShotFileName } = require('../util/util');
const { getObjectByXpath } = require('./getObject');
const { takeScreenShot } = require('./takeScreenShot');
const { actionResult } = require('./actionResult');

// const { log } = require('../util/log');

async function actionVerifyText(action) {
  // console.log('actionInput', JSON.stringify(action));
  const targetObject = await getObjectByXpath(action.page, action.objectXpath);
  const text = await action.page.evaluate(object => object.textContent, targetObject);
  let result;
  if (text !== action.actionParam) {
    result = actionResult(action, 'NG');
  } else {
    result = actionResult(action, 'OK');
  }
  await takeScreenShot(action.page, getScreenShotFileName(action));
  return result;
}

module.exports.actionVerifyText = actionVerifyText;
