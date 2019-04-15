const { log } = require('../util/log');

async function getFrame(action) {
  const { page, frame } = action;
  let foundFrame = false;
  let targetFrame;
  if (frame) {
    log.debug('searching frame', frame);
    const frames = await page.frames();
    for (let i = 0; i < frames.length; i += 1) {
      const framename = frames[i].name();
      if (framename === frame) {
        log.debug('found frame', framename);
        targetFrame = frames[i];
        foundFrame = true;
        break;
      }
    }
    if (!foundFrame) {
      throw new Error(`frame ${frame} was not found`);
    }
  } else {
    targetFrame = action.page;
  }
  return targetFrame;
}

module.exports.getFrame = getFrame;
