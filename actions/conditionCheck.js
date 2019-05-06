const { getScreenShotFileName } = require('../util/util');
const { log } = require('../util/log');
const { getObjectByXpath } = require('./getObject');
const { takeScreenShot } = require('./takeScreenShot');
const { actionResult } = require('./actionResult');

async function actionConditionCheck(action) {
  log.debug('actionConditionCheck start', action.description);
  const appearedelement = await Promise.race([
    action.page.waitForXPath(action.ObjectForTrue),
    action.page.waitForXPath(action.ObjectForFalse),
  ]);
  const ifObjecgForTrueExist = await appearedelement.$x(action.ObjectForTrue);
  if (ifObjecgForTrueExist.length > 0) {
    log.debug(`${action.ObjectForTrue} exists , set flag to True`);
    global.WFTSkipFlag = true;
  } else {
    log.debug(`${action.ObjectForFalse} exists , set flag to True`);
    global.WFTSkipFlag = false;
  }
  await takeScreenShot(action.page, getScreenShotFileName(action));

  log.debug('actionConditionCheck end', action.description);
  return actionResult(action);
}

module.exports.actionConditionCheck = actionConditionCheck;
