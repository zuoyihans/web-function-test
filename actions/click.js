const { getScreenShotFileName } = require('../util/util');

async function actionClick(action) {
  // console.log('actionClick', action.objectXpath);
  const targetObject = await action.page.$x(action.objectXpath);
  // console.log('actionClick', targetObject);
  // console.log(login);
  if (targetObject.length === 1) {
    await targetObject[0].click();
  } else {
    throw new Error(`more than 1 object found of xpath ${action.objectXpath}`);
  }
  await action.page.screenshot({
    path: getScreenShotFileName(action),
    fullPage: true,
  });
};

module.exports.actionClick = actionClick;
