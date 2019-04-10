const { log } = require('../util/log');

async function takeScreenShot(page, filename) {
  log.debug('takeScreenShot to ', filename);
  await page.screenshot({
    path: filename,
    fullPage: true,
  });
}

module.exports.takeScreenShot = takeScreenShot;
