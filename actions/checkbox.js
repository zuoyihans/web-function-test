const { getScreenShotFileName } = require('../util/util');
const { takeScreenShot } = require('./takeScreenShot');
const { getObjectByXpath } = require('./getObject');
const { log } = require('../util/log');

async function actionCheckbox(action) {
  log.debug('actionCheckbox start', JSON.stringify(action.description));
  const targetCheckBox = await getObjectByXpath(action.page, action.objectXpath);
  const currentStatus = await action.page.evaluate(el => el.checked, targetCheckBox);
  log.debug('currentStatus', currentStatus);
  const desiredStatus = action.actionParam === 'Checked' || false;
  log.debug('desiredStatus', desiredStatus);
  if (currentStatus !== desiredStatus) {
    await targetCheckBox.click();
  }
  await takeScreenShot(action.page, getScreenShotFileName(action));
  log.debug('actionCheckbox end');
}

module.exports.actionCheckbox = actionCheckbox;
