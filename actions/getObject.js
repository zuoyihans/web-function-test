const fs = require('fs');
const { log } = require('../util/log');

async function getObjectByXpath(action) {
  const { page, objectXpath, frame } = action;
  let targetObject;
  let foundFrame = false;
  let targetFrame;
  if (frame) {
    log.debug('searching frame', frame);
    const frames = await page.frames();
    for (let i = 0; i < frames.length; i += 1) {
      const framename = frames[i].name();
      log.debug('found frame', framename);
      if (framename === frame) {
        targetFrame = frames[i];
        foundFrame = true;
        break;
      }
    }
    if (!foundFrame) {
      throw new Error(`frame ${frame} was not found`);
    }
    targetObject = await targetFrame.$x(objectXpath);
  } else {
    targetObject = await page.$x(objectXpath);
  }
  if (targetObject.length === 1) {
    return {
      frame: targetFrame,
      object: targetObject[0],
    };
  }
  if (targetObject.length === 0) {
    log.error(`no object found verify your xpath |${objectXpath}|`);
    throw new Error(`no object found for xpath ${objectXpath}`);
  }
  log.error(`found ${targetObject.length} objects, please verify your xpath |${objectXpath}|`);
  throw new Error(`more than 1 object found for xpath ${objectXpath}`);
}

module.exports.getObjectByXpath = getObjectByXpath;
