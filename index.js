/* eslint-disable no-await-in-loop */

const fs = require('fs');
const puppeteer = require('puppeteer');

const {
  readJsonFile,
  getCasefilelist,
} = require('./util/util');


const {
  openUrl,
  input,
  click,
} = require('./util/constant');
const { actionOpenUrl } = require('./actions/openUrl');
const { actionInput } = require('./actions/input');
const { actionClick } = require('./actions/click');

async function executeActions(page, data) {
  for (let actionidx = 0; actionidx < data.actions.length; actionidx += 1) {
    const action = data.actions[actionidx];
    const paramAction = { ...action };
    paramAction.caseid = data.caseid;
    paramAction.componentidx = data.componentidx + 1;
    paramAction.actionidx = actionidx + 1;
    paramAction.page = page;
    switch (paramAction.actionType) {
      case openUrl:
        await actionOpenUrl(paramAction);
        break;
      case input:
        await actionInput(paramAction);
        break;
      case click:
        await actionClick(paramAction);
        break;
      default:
        throw new Error(`unknow action ${paramAction.actionType}`);
    }
  }
}

async function executeTest(casefile, config) {
  const params = await readJsonFile(`${config.executionFolder}/param.json`);
  const caseinfo = await readJsonFile(`${config.executionFolder}/${casefile}`);
  const caseid = casefile.replace('.json', '');
  const browser = await puppeteer.launch(
    {
      // headless: false,
      ignoreHTTPSErrors: true,
    },
  );
  const page = await browser.newPage();
  // const page = {};
  for (let index = 0; index < caseinfo.length; index += 1) {
    const component = caseinfo[index];
    const componentinfo = await readJsonFile(`${config.componentFolder}/${component.component}.json`);
    const componentidx = index;
    const actions = componentinfo.actions.map((action) => {
      const replaceParam = { ...action };
      if (replaceParam.actionParam && replaceParam.actionParam.startsWith('P_')) {
        replaceParam.actionParam = params[component.ukey][replaceParam.actionParam];
      }
      return replaceParam;
    });
    await executeActions(
      page,
      {
        caseid,
        componentidx,
        actions,
      },
    );
  }
  await browser.close();
  return '';
}

async function main(configpath) {
  const config = await readJsonFile(configpath);
  const files = await fs.readdirSync(config.executionFolder);
  const casefilelist = getCasefilelist(files);
  for (let caseidx = 0; caseidx < casefilelist.length; caseidx += 1) {
    const casefile = casefilelist[caseidx];
    await executeTest(casefile, config);
  }
}

module.exports.main = main;
