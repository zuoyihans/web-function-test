const puppeteer = require('puppeteer');
const { testdata } = require('./scenario');
const { params } = require('./param');
const { 
  getActionDetail,
  takeAction,
} = require('./util/util');

(async () => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();

  for(let caseidx = 0; caseidx < testdata.length; caseidx = caseidx + 1) {
    const testcase = testdata[caseidx];
    console.log('testcase loop ', caseidx, testcase);
    for(let scenarioidx = 0; scenarioidx < testcase.scenarios.length; scenarioidx = scenarioidx + 1) {
      const testscenario = testcase.scenarios[scenarioidx];
      console.log('testscenario loop ', scenarioidx, testscenario);

      for(let actionidx = 0; actionidx < testscenario.actions.length; actionidx = actionidx + 1) {
        const action = testscenario.actions[actionidx];
        console.log(`case No${caseidx}=>scenario No${scenarioidx}=>action No${actionidx}`, action.action);
        const actiondetail = getActionDetail(action, params);
        actiondetail.page = page;
        actiondetail.case = testcase;
        actiondetail.caseid = caseidx + 1;
        actiondetail.scenario = testcase;
        actiondetail.scenarioid = scenarioidx + 1;
        actiondetail.actionid = actionidx + 1;
        await takeAction(actiondetail);
      }
    }
  }
  await browser.close();
})();