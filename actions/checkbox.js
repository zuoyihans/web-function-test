const { getScreenShotFileName } = require('../util/util');
const { takeScreenShot } = require('./takeScreenShot');
const { getObjectByXpath } = require('./getObject');
const { log } = require('../util/log');
const { actionResult } = require('./actionResult');

async function actionCheckbox(action) {
  log.debug('actionCheckbox start', JSON.stringify(action.description));
  const { frame, object } = await getObjectByXpath(action);
  let currentStatus;
  if (frame) {
    currentStatus = await frame.evaluate(el => el.checked, object);
  } else {
    currentStatus = await action.page.evaluate(el => el.checked, object);
  }
  log.debug('currentStatus', currentStatus);
  const desiredStatus = action.actionParam === 'Checked' || false;
  log.debug('desiredStatus', desiredStatus);
  if (currentStatus !== desiredStatus) {
    await object.click();
  }
  await takeScreenShot(action.page, getScreenShotFileName(action));
  log.debug('actionCheckbox end');
  return actionResult(action);
}

module.exports.actionCheckbox = actionCheckbox;
