const { getScreenShotFileName } = require('../util/util');
const { takeScreenShot } = require('./takeScreenShot');
const { actionResult } = require('./actionResult');

async function actionOpenUrl(action) {
  // console.log('actionOpenUrl', JSON.stringify(action));
  await action.page.goto(action.actionParam);
  await takeScreenShot(action.page, getScreenShotFileName(action));
  return actionResult(action);
}

module.exports.actionOpenUrl = actionOpenUrl;
