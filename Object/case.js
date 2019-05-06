/* eslint-disable no-await-in-loop */
const puppeteer = require('puppeteer');
const pptrFirefox = require('puppeteer-firefox');

const { log } = require('../util/log');

const {
  readJsonFile,
  param2Value,
} = require('../util/util');
const {
  openUrl,
  input,
  click,
  checkbox,
  verifyText,
  fileUpload,
  select,
  hover,
} = require('../util/constant');
const { actionOpenUrl } = require('../actions/openUrl');
const { actionInput } = require('../actions/input');
const { actionClick } = require('../actions/click');
const { actionCheckbox } = require('../actions/checkbox');
const { actionVerifyText } = require('../actions/verifyText');
const { actionFileUpload } = require('../actions/fileUpload');
const { actionSelect } = require('../actions/select');
const { actionHover } = require('../actions/hover');

class TestCase {
  constructor(casefile, config) {
    log.debug('create TestCase ', casefile);
    this.config = config;
    this.params = readJsonFile(`${config.executionFolder}/param.json`);
    this.casefile = casefile;
    this.caseid = casefile.replace('.json', '');
    this.caseinfo = readJsonFile(`${config.executionFolder}/${casefile}`);
  }

  // get config() {
  //   return this.config;
  // }

  // get params() {
  //   return this.params;
  // }

  // get caseinfo() {
  //   return this.caseinfo;
  // }

  // get casefile() {
  //   return this.casefile;
  // }

  getBrowser() {
    return this.browser || null;
  }

  setBrowser(browser) {
    this.browser = browser;
  }

  setDefaultPage(page) {
    this.defaultPage = page;
  }

  async executeAction(action) {
    log.debug('executeAction', action.actionType, action.actionParam || '', 'start');
    const paramAction = { ...action };
    paramAction.caseid = this.caseid;
    paramAction.componentidx = this.currentComponentIdx + 1;
    paramAction.actionidx = this.currentActionIdx;
    paramAction.page = this.defaultPage;
    paramAction.config = this.config;
    let actionResult;
    switch (paramAction.actionType) {
      case openUrl:
        actionResult = await actionOpenUrl(paramAction);
        break;
      case input:
        actionResult = await actionInput(paramAction);
        break;
      case click:
        actionResult = await actionClick(paramAction);
        break;
      case checkbox:
        actionResult = await actionCheckbox(paramAction);
        break;
      case verifyText:
        actionResult = await actionVerifyText(paramAction);
        break;
      case fileUpload:
        actionResult = await actionFileUpload(paramAction);
        break;
      case select:
        actionResult = await actionSelect(paramAction);
        break;
      case hover:
        actionResult = await actionHover(paramAction);
        break;
      default:
        throw new Error(`unknow action ${paramAction.actionType}`);
    }
    log.debug('executeAction', action.actionType, action.actionParam || '', 'end');
    return actionResult;
  }

  async executeComponent(component) {
    const componentinfo = { ...component };
    componentinfo.actions = component.actions.map(
      action => param2Value(component.ukey, action, this.params),
    );
    log.debug(`${componentinfo.actions.length} actions will be executed`);
    // log.debug('executeComponent', componentinfo.actions);
    componentinfo.actionresults = [];
    for (let actionidx = 0; actionidx < componentinfo.actions.length; actionidx += 1) {
      this.currentActionIdx = actionidx + 1;
      log.debug(`Action No${this.currentActionIdx} start`);
      const singleactionresult = await this.executeAction(componentinfo.actions[actionidx]);
      componentinfo.actionresults.push(singleactionresult);
      log.debug(`Action No${this.currentActionIdx} end`);
    }
    delete componentinfo.actions;
    return componentinfo;
  }

  async execute() {
    const width = this.config.viewPort.width || 1280;
    const height = this.config.viewPort.height || 768;
    log.debug(`launch puppeteer => headless mode:${this.config.headless} viewport ${width}*${height} delay ${this.config.delay / 1000}s for each step`);
    const launchConfig = {
      headless: this.config.headless,
      ignoreHTTPSErrors: true,
      args: [`--window-size=${width},${height}`],
      defaultViewport: {
        width,
        height,
      },
      slowMo: this.config.delay,
    };
    if (process.env.wftBrowser === 'Chrome') {
      log.debug(`launch ${process.env.wftBrowser}`);
      this.browser = await puppeteer.launch(launchConfig);
    } else {
      log.debug(`launch ${process.env.wftBrowser}`);
      this.browser = await pptrFirefox.launch(launchConfig);
    }
    this.defaultPage = await this.browser.newPage();
    // const page = {};
    this.components = this.caseinfo.map((component) => {
      const componentdetail = readJsonFile(`${this.config.componentFolder}/${component.component}.json`);
      componentdetail.ukey = component.ukey;
      return componentdetail;
    });
    log.debug(`${this.components.length} components found`);
    this.componentresult = [];
    for (let componentidx = 0; componentidx < this.components.length; componentidx += 1) {
      this.currentComponentIdx = componentidx + 1;
      log.debug(`Component No${this.currentComponentIdx}:  ${this.components[componentidx].description} start`);
      const singleresult = await this.executeComponent(this.components[componentidx]);
      this.componentresult.push(singleresult);
      log.debug(`Component No${this.currentComponentIdx} ${this.components[componentidx].description} end`);
    }
    await this.browser.close();
    log.debug('execute end');
    return {
      caseid: this.caseid,
      component: this.componentresult,
    };
  }
}

module.exports.TestCase = TestCase;
