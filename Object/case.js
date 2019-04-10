/* eslint-disable no-await-in-loop */

const puppeteer = require('puppeteer');
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
} = require('../util/constant');
const { actionOpenUrl } = require('../actions/openUrl');
const { actionInput } = require('../actions/input');
const { actionClick } = require('../actions/click');
const { actionCheckbox } = require('../actions/checkbox');
const { actionVerifyText } = require('../actions/checkbox');

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

  get browser() {
    return this.browser || null;
  }

  set browser(browser) {
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
      case checkbox:
        await actionCheckbox(paramAction);
        break;
      case verifyText:
        await actionVerifyText(paramAction);
      default:
        throw new Error(`unknow action ${paramAction.actionType}`);
    }
  }

  async executeComponent(component) {
    log.debug('execute component no', this.currentComponentIdx);
    const componentinfo = { ...component };
    componentinfo.actions = component.actions.map(
      action => param2Value(component.ukey, action, this.params),
    );
    log.debug('actions', JSON.stringify(componentinfo.actions));

    // log.debug('executeComponent', componentinfo.actions);
    componentinfo.actionresults = [];
    for (let actionidx = 0; actionidx < componentinfo.actions.length; actionidx += 1) {
      this.currentActionIdx = actionidx + 1;
      const singleactionresult = await this.executeAction(componentinfo.actions[actionidx]);
      componentinfo.actionresults.push(singleactionresult);
    }
    return componentinfo;
  }

  async execute() {
    log.debug('execute start');
    const width = this.config.viewPort.width || 1280;
    const height = this.config.viewPort.height || 768;
    log.debug('launch puppeteer');
    this.browser = await puppeteer.launch(
      {
        headless: this.config.headless,
        ignoreHTTPSErrors: true,
        args: [`--window-size=12${width},${height}`],
        defaultViewport: {
          width,
          height,
        },
        slowMo: this.config.delay,
      },
    );
    log.debug('create blank page');
    this.defaultPage = await this.browser.newPage();
    // const page = {};
    this.components = this.caseinfo.map((component) => {
      const componentdetail = readJsonFile(`${this.config.componentFolder}/${component.component}.json`);
      componentdetail.ukey = component.ukey;
      return componentdetail;
    });
    log.debug(`${this.components.length} components found`, JSON.stringify(this.components));
    this.componentresult = [];
    for (let componentidx = 0; componentidx < this.components.length; componentidx += 1) {
      this.currentComponentIdx = componentidx + 1;
      const singleresult = await this.executeComponent(this.components[componentidx]);
      this.componentresult.push(singleresult);
    }
    await this.browser.close();
    log.debug('execute end');
  }
}

module.exports.TestCase = TestCase;
