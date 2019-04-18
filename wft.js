#!/usr/bin/env node
const program = require('commander');
const chalk = require('chalk');
const open = require('open');
const jsonfile = require('jsonfile');
const fs = require('fs');
const app = require('./UI/app');
const pkg = require('./package.json');

const sampleComponent1 = require('./example/component/001_打开url.json');
const sampleComponent2 = require('./example/component/002_基本操作.json');

const sampleCase = [
  {
    component: '001_打开url',
  },
  {
    component: '002_基本操作',
  },
];


const { log } = console;
const { initConfig } = require('./index');
const {
  readJsonFile,
} = require('./util/util');
const { main, updateExecution } = require('./index');

let validCommand = false;

async function createExample(configFileName) {
  const targetConfigFile = configFileName.config || 'config.json';
  const paramexists = fs.existsSync(targetConfigFile);
  if (!paramexists) {
    log(chalk.redBright(`config file ${targetConfigFile} not found , please run "wsk init" first`));
    process.exit(1);
  } else {
    const configs = readJsonFile(targetConfigFile);
    const { componentFolder, executionFolder } = configs;
    jsonfile.writeFileSync(`${componentFolder}/001_打开url.json`, sampleComponent1, { spaces: 2, EOL: '\r\n' });
    jsonfile.writeFileSync(`${componentFolder}/002_基本操作.json`, sampleComponent2, { spaces: 2, EOL: '\r\n' });
    jsonfile.writeFileSync(`${executionFolder}/case001_samplecase.json`, sampleCase, { spaces: 2, EOL: '\r\n' });
    await updateExecution(targetConfigFile);
    const params = readJsonFile(`${executionFolder}/param.json`);
    const componentkeys = Object.keys(params);
    params[componentkeys[0]].P_Url = 'https://getbootstrap.com/docs/4.3/examples/checkout/';
    params[componentkeys[1]].P_ExpectTitle = 'Checkout form';
    params[componentkeys[1]].P_FirstName = 'firstname';
    params[componentkeys[1]].P_ExpectStatus = 'Checked';
    params[componentkeys[1]].P_ValueForSelect = 'United States';
    jsonfile.writeFileSync(`${executionFolder}/param.json`, params, { spaces: 2, EOL: '\r\n' });
    open(`${executionFolder}/param.json`);

    log(chalk.whiteBright(''));
    log(chalk.whiteBright(`please wait until param.json to be open ,if it is not opened ,please open ${executionFolder}/param.json, and input your github user/password`));
  }
}

async function runtest(configFileName) {
  const targetConfigFile = configFileName.config || 'config.json';
  await main(targetConfigFile);
}

async function updateParam(configFileName) {
  const targetConfigFile = configFileName.config || 'config.json';
  await updateExecution(targetConfigFile);
}

async function launchui(configFileName) {
  const port = process.env.PORT || '3000';
  const targetConfigFile = configFileName.config || 'config.json';
  const configs = await readJsonFile(targetConfigFile);
  app.listen(port, () => {
    open(`http://localhost:${port}`);
    process.env.componentFolder = configs.componentFolder;
    process.env.executionFolder = configs.executionFolder;
    process.env.outputFolder = configs.outputFolder;
    process.env.configFile = configs.targetConfigFile;
    log(chalk.yellow(`server starting on http://localhost:${port}`));
  });
}

program.version(pkg.version)
  .option('-v --version', 'print version');

program
  .command('init')
  .option('-c, --config [config_file]', 'Specify config file name')
  .action((cmd) => {
    validCommand = true;
    initConfig(cmd);
  });

program
  .command('ui')
  .option('-c, --config [config_file]', 'Specify config file name')
  .action((cmd) => {
    validCommand = true;
    launchui(cmd);
  });

program
  .command('example')
  .option('-c, --config [config_file]', 'Specify config file name')
  .action((cmd) => {
    validCommand = true;
    createExample(cmd);
  });

program
  .command('updateParam')
  .option('-c, --config [config_file]', 'Specify config file name')
  .action((cmd) => {
    validCommand = true;
    updateParam(cmd);
  });

program
  .command('run')
  .option('-c, --config [config_file]', 'Specify config file name')
  .action((cmd) => {
    validCommand = true;
    runtest(cmd);
  });

function displayUsage() {
  process.exit(1);
}

program.on('--help', displayUsage);

program.parse(process.argv);

if (!validCommand) {
  program.outputHelp();
}
// console.log(program.command);
