const { getScreenShotFileName } = require('../util/util');

async function actionOpenUrl(action) {
  // console.log('actionOpenUrl', JSON.stringify(action));
  await action.page.goto(action.actionParam);
  await action.page.screenshot({
    path: getScreenShotFileName(action),
  });
}

module.exports.actionOpenUrl = actionOpenUrl;
