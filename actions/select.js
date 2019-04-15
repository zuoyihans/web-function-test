const { getScreenShotFileName } = require('../util/util');
const { getFrame } = require('./getFrame');
const { takeScreenShot } = require('./takeScreenShot');
const { actionResult } = require('./actionResult');

const { log } = require('../util/log');

async function actionSelect(action) {
  if (action.frame) {
    log.debug('select is in frame:', action.frame);
    const frame = await getFrame(action);
    await frame.select(`select[${action.selectLocator}]`, action.actionParam);
  } else {
    await action.page.select(`select[${action.selectLocator}]`, action.actionParam);
  }
  await takeScreenShot(action.page, getScreenShotFileName(action));
  return actionResult(action);
}

module.exports.actionSelect = actionSelect;
