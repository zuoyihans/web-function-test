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
  config.outputFolder = `${config.outputFolder}/${timestamp}`;
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
          if (!has.call(params[content.ukey], action.actionParam)) {
            params[content.ukey][action.actionParam] = '';
          }
        }
        if (action.objectParams) {
          action.objectParams.forEach((objectParam) => {
            log(chalk.cyan(`checking object param ${objectParam} in params`));
            if (!has.call(params[content.ukey], objectParam)) {
              params[content.ukey][objectParam] = '';
            }
          });
        }
      });
    });
    log(chalk.cyan('searching param end'));

    jsonfile.writeFile(`${executionFolder}/${singlecase}`, updatedContent, { spaces: 2, EOL: '\r\n' }, (writeerr) => {
      if (writeerr) log.error(writeerr);
    });
  });
  jsonfile.writeFile(`${executionFolder}/param.json`, params, { spaces: 2, EOL: '\r\n' }, (writeerr) => {
    if (writeerr) log.error(writeerr);
  });
  log(chalk.green('updateExecution end'));
}

module.exports.main = main;
module.exports.updateExecution = updateExecution;
