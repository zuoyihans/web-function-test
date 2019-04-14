const fs = require('fs');
const { log } = require('../util/log');

async function getObjectByXpath(page, xpath, objectFrame) {
  let targetObject;
  if (objectFrame) {
    const frames = await page.frames();
    let targetFrame;
    for (let i = 0; i < frames.length; i += 1) {
      const framename = frames[i].name();
      if (framename === objectFrame) {
        targetFrame = frames[i];
        break;
      }
    }
    targetObject = await targetFrame.$x(xpath);
  } else {
    targetObject = await page.$x(xpath);
  }
  if (targetObject.length === 1) {
    return targetObject[0];
  }
  fs.writeFileSync('error_page.html', await page.content());
  if (targetObject.length === 0) {
    log.error(`no object found verify your xpath |${xpath}|`);
    throw new Error(`no object found for xpath ${xpath}`);
  }
  log.error(`found ${targetObject.length} objects, please verify your xpath |${xpath}|`);
  throw new Error(`more than 1 object found for xpath ${xpath}`);
}

module.exports.getObjectByXpath = getObjectByXpath;
