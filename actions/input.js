const { getScreenShotFileName } = require('../util/util');
const { getObjectByXpath } = require('./getObject');
const { takeScreenShot } = require('./takeScreenShot');
const { actionResult } = require('./actionResult');

// const { log } = require('../util/log');

async function actionInput(action) {
  // console.log('actionInput', JSON.stringify(action));
  const targetObject = await getObjectByXpath(action.page, action.objectXpath);
  await targetObject.type(action.actionParam);
  await takeScreenShot(action.page, getScreenShotFileName(action));
  return actionResult(action);
}

module.exports.actionInput = actionInput;
