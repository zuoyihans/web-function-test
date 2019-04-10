
async function takeScreenShot(page, filename) {
  await page.screenshot({
    path: filename,
    fullPage: true,
  });
}

module.exports.takeScreenShot = takeScreenShot;
