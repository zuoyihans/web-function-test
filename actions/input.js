const { getScreenShotFileName } = require('../util/util');

async function actionInput(action) {
  // console.log('actionInput', JSON.stringify(action));
  const targetObject = await action.page.$x(action.objectXpath);

  // console.log(login);
  if (targetObject.length === 1) {
    await targetObject[0].type(action.actionParam);
  } else {
    throw new Error(`more than 1 object found of xpath ${action.objectXpath}`);
  }
  await action.page.screenshot({
    path: getScreenShotFileName(action),
  });
};

module.exports.actionInput = actionInput;
