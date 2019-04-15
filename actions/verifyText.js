const { getScreenShotFileName } = require('../util/util');
const { getObjectByXpath } = require('./getObject');
const { takeScreenShot } = require('./takeScreenShot');
const { actionResult } = require('./actionResult');

// const { log } = require('../util/log');

async function actionVerifyText(action) {
  // console.log('actionInput', JSON.stringify(action));
  const { frame, object } = await getObjectByXpath(action);
  let text;
  if (frame) {
    text = await frame.evaluate(targetObject => targetObject.textContent, object);
  } else {
    text = await action.page.evaluate(targetObject => targetObject.textContent, object);
  }
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
