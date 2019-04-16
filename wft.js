#!/usr/bin/env node
const program = require('commander');
const chalk = require('chalk');
const open = require('open');

const app = require('./UI/app');
const pkg = require('./package.json');

const { log } = console;
const { initConfig } = require('./index');
const {
  readJsonFile,
} = require('./util/util');

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
  .action(initConfig);

program
  .command('ui')
  .option('-c, --config [config_file]', 'Specify config file name')
  .action(launchui);

function displayUsage() {
  process.exit(1);
}

program.on('--help', displayUsage);

program.parse(process.argv);
