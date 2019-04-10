/* eslint-disable no-await-in-loop */

const { getScreenShotFileName } = require('../util/util');
const { takeScreenShot } = require('./takeScreenShot');
const { actionResult } = require('./actionResult');

async function switchWindowByTitle(testcase, action) {
  const pages = await testcase.browser.pages();
  for (let pageidx = 0; pageidx < pages.length; pageidx += 1) {
    const title = await pages[pageidx].title();
    if (title.indexOf(action.actionParam) > 0) {
      testcase.setDefaultPage(pages[pageidx]);
      await pages[pageidx].bringToFront();
      await takeScreenShot(action.page, getScreenShotFileName(action));
      break;
    }
  }
  return actionResult(action);
}

module.exports.switchWindowByTitle = switchWindowByTitle;
