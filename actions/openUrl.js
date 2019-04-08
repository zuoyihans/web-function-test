

async function actionOpenUrl(actiondetail) {
  // console.log('actionOpenUrl', 'actiondetail', actiondetail);
  await actiondetail.page.goto(actiondetail.url);
  console.log('save as ', actiondetail.snapshotname);
  await actiondetail.page.screenshot({
    path: actiondetail.snapshotname,
  });
}

module.exports.actionOpenUrl = actionOpenUrl;
