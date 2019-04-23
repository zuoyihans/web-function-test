/* eslint-disable no-await-in-loop */

const fs = require('fs');
const moment = require('moment');
const srs = require('secure-random-string');
const jsonfile = require('jsonfile');
const chalk = require('chalk');
const { TestCase } = require('./Object/case');

const { log } = console;

const has = Object.prototype.hasOwnProperty;

const {
  readJsonFile,
  getCasefilelist,
} = require('./util/util');

async function main(configpath) {
  const timestamp = moment().format('YYYYMMDDhhmmss');

  const config = await readJsonFile(configpath);
  config.outputFolder = `${config.outputFolder}/${process.env.wftBrowser}_${timestamp}`;
  fs.mkdirSync(config.outputFolder);
  const files = await fs.readdirSync(config.executionFolder);
  const casefilelist = getCasefilelist(files);
  const allresult = [];
  for (let caseidx = 0; caseidx < casefilelist.length; caseidx += 1) {
    log(chalk.green(`Case No${caseidx + 1} start`));
    const casefile = casefilelist[caseidx];
    const testcase = new TestCase(casefile, config);
    const caseresult = await testcase.execute();
    allresult.push(caseresult);
    log(chalk.green(`Case No${caseidx + 1} end`));
  }
  jsonfile.writeFile(`${config.outputFolder}/testresult.json`, allresult, { spaces: 2, EOL: '\r\n' }, (writeerr) => {
    if (writeerr) log.error(writeerr);
  });
}

async function updateExecution(configpath) {
  log(chalk.green('updateExecution start'));
  const config = await readJsonFile(configpath);
  const { executionFolder, componentFolder } = config;
  const paramexists = fs.existsSync(`${executionFolder}/param.json`);
  let params = {};
  if (paramexists) {
    params = readJsonFile(`${executionFolder}/param.json`);
  }
  const files = fs.readdirSync(executionFolder);
  const casefilelist = getCasefilelist(files);
  casefilelist.forEach((singlecase) => {
    log(chalk.yellow(`processing case file ${singlecase} start`));
    const casecontent = readJsonFile(`${executionFolder}/${singlecase}`);
    const updatedContent = casecontent.map((component, index) => {
      log(chalk.yellow(`check ukey ${component.component} start`));
      const updatedComponent = { ...component };
      updatedComponent.index = index + 1;
      if (!has.call(updatedComponent, 'ukey')) {
        log(chalk.yellow(`add ukey to ${component.component}`));
        updatedComponent.ukey = srs({
          length: 8,
          alphanumeric: true,
        });
      }
      if (!has.call(params, updatedComponent.ukey)) {
        params[updatedComponent.ukey] = {};
      }
      log(chalk.yellow(`check ukey ${component.component} end`));
      return updatedComponent;
    });
    log(chalk.yellow(`processing case file ${singlecase} end`));
    log(chalk.cyan('searching param start'));

    updatedContent.forEach((content) => {
      const componentinfo = readJsonFile(`${componentFolder}/${content.component}.json`);
      componentinfo.actions.forEach((action) => {
        log(chalk.cyan(`searching ${componentinfo.description} => ${action.description}`));
        if (action.actionParam) {
          log(chalk.cyan(`checking action param ${action.actionParam} in params`));
          if (action.actionParam.startsWith('P_') || action.actionParam.startsWith('P_')) {
            if (!has.call(params[content.ukey], action.actionParam)) {
              params[content.ukey][action.actionParam] = '';
            }
          }
        }
        if (action.objectParams) {
          const objectParams = Object.keys(action.objectParams);
          objectParams.forEach((objectParam) => {
            log(chalk.cyan(`checking object param ${objectParam} in params`));
            if (!has.call(params[content.ukey], objectParam)) {
              params[content.ukey][objectParam] = '';
            }
          });
        }
      });
    });
    log(chalk.cyan('searching param end'));

    jsonfile.writeFileSync(`${executionFolder}/${singlecase}`, updatedContent, { spaces: 2, EOL: '\r\n' });
  });
  jsonfile.writeFileSync(`${executionFolder}/param.json`, params, { spaces: 2, EOL: '\r\n' });
  log(chalk.green('updateExecution end'));
}

function initConfig(configFileName) {
  const targetConfigFile = configFileName.config || 'config.json';
  log(chalk.green(`trying to init config file ${targetConfigFile}`));
  const componentFolder = './component';
  const executionFolder = './execution';
  const outputFolder = './output';
  const sampleconfig = {
    componentFolder,
    executionFolder,
    headless: false,
    delay: 10,
    viewPort: {
      width: 1280,
      height: 768,
    },
    outputFolder,
  };
  const paramexists = fs.existsSync(targetConfigFile);
  if (paramexists) {
    log(chalk.red(`${targetConfigFile} exists , backup it before you run wft init`));
  } else {
    jsonfile.writeFile(targetConfigFile, sampleconfig, { spaces: 2, EOL: '\r\n' }, (writeerr) => {
      if (writeerr) {
        log(chalk.red(writeerr));
      } else {
        log(chalk.green(`${targetConfigFile} created`));
        if (!fs.existsSync(componentFolder)) {
          log(chalk.green(`${componentFolder} created`));
          fs.mkdirSync(componentFolder);
        }
        if (!fs.existsSync(executionFolder)) {
          log(chalk.green(`${executionFolder} created`));
          fs.mkdirSync(executionFolder);
        }
        if (!fs.existsSync(outputFolder)) {
          log(chalk.green(`${outputFolder} created`));
          fs.mkdirSync(outputFolder);
        }
        log(chalk.green(`${targetConfigFile} created`));
        log(chalk.whiteBright('for more help about config, please check'));
        log(chalk.whiteBright('https://github.com/k19810703/web-function-test/blob/master/configReadMe.md'));
      }
    });
  }
}

module.exports.main = main;
module.exports.updateExecution = updateExecution;
module.exports.initConfig = initConfig;
