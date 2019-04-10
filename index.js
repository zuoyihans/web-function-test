/* eslint-disable no-await-in-loop */

const fs = require('fs');
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


// const {
//   openUrl,
//   input,
//   click,
//   checkbox,
// } = require('./util/constant');
// const { actionOpenUrl } = require('./actions/openUrl');
// const { actionInput } = require('./actions/input');
// const { actionClick } = require('./actions/click');
// const { actionCheckbox } = require('./actions/checkbox');

// async function executeActions(page, data) {
//   for (let actionidx = 0; actionidx < data.actions.length; actionidx += 1) {
//     const action = data.actions[actionidx];
//     const paramAction = { ...action };
//     paramAction.caseid = data.caseid;
//     paramAction.componentidx = data.componentidx + 1;
//     paramAction.actionidx = actionidx + 1;
//     paramAction.page = page;
//     switch (paramAction.actionType) {
//       case openUrl:
//         await actionOpenUrl(paramAction);
//         break;
//       case input:
//         await actionInput(paramAction);
//         break;
//       case click:
//         await actionClick(paramAction);
//         break;
//       case checkbox:
//         await actionCheckbox(paramAction);
//         break;
//       default:
//         throw new Error(`unknow action ${paramAction.actionType}`);
//     }
//   }
// }

// async function executeTest(casefile, config) {
//   const params = await readJsonFile(`${config.executionFolder}/param.json`);
//   const caseinfo = await readJsonFile(`${config.executionFolder}/${casefile}`);
//   const caseid = casefile.replace('.json', '');
//   const width = config.viewPort.width || 1280;
//   const height = config.viewPort.height || 768;
//   const browser = await puppeteer.launch(
//     {
//       headless: config.headless,
//       ignoreHTTPSErrors: true,
//       args: [`--window-size=12${width},${height}`],
//       defaultViewport: {
//         width,
//         height,
//       },
//       slowMo: config.delay,
//     },
//   );
//   const page = await browser.newPage();
//   // const page = {};
//   for (let index = 0; index < caseinfo.length; index += 1) {
//     const component = caseinfo[index];
//     const componentinfo = await readJsonFile(`${config.componentFolder}/${component.component}.json`);
//     const componentidx = index;
//     const actions = componentinfo.actions.map((action) => {
//       const replaceParam = { ...action };
//       if (replaceParam.actionParam && replaceParam.actionParam.startsWith('P_')) {
//         replaceParam.actionParam = params[component.ukey][replaceParam.actionParam];
//       }
//       return replaceParam;
//     });
//     await executeActions(
//       page,
//       {
//         caseid,
//         componentidx,
//         actions,
//       },
//     );
//   }
//   // await browser.close();
//   return '';
// }

async function main(configpath) {
  const config = await readJsonFile(configpath);
  const files = await fs.readdirSync(config.executionFolder);
  const casefilelist = getCasefilelist(files);
  for (let caseidx = 0; caseidx < casefilelist.length; caseidx += 1) {
    const casefile = casefilelist[caseidx];
    const testcase = new TestCase(casefile, config);
    await testcase.execute();
  }
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
