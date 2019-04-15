#!/usr/bin/env node
const program = require('commander');
const chalk = require('chalk');
const pkg = require('./package.json');

const { log } = console;
const { updateExecution } = require('./index');


program.version(pkg.version)
  .option('-v --version', 'print version')
  .option('--config [path_to_config]', 'set config file path');

function displayUsage() {
  log(chalk.green('for help , just type '));
  log(chalk.green('updateExecution -h '));
  log('');
  log(chalk.red('* config is mandontory'));
  log(chalk.green('sample: updateExecution --config=./config.json'));
  process.exit(1);
}


program.on('--help', displayUsage);

program.parse(process.argv);


if (!program.config) {
  displayUsage();
}

(async () => {
  await updateExecution(program.config);
})();
