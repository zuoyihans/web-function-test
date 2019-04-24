#!/usr/bin/env node
const program = require('commander');
const chalk = require('chalk');
const open = require('open');

const app = require('./app');
const pkg = require('../package.json');

const { log } = console;
const port = process.env.PORT || '3001';
const globalConfig = {};

program.version(pkg.version)
  .option('-v --version', 'print version')
  .option('--componentFolder [path_to_componentFolder]', 'set component folder')
  .option('--executionFolder [path_to_executionFolder]', 'set execution folder')
  .option('--outputFolder [path_to_outputFolder]', 'set output folder');

function displayUsage() {
  log(chalk.red('* componentFolder,executionFolder,outputFolder are mandontory'));
  log(chalk.green('sample: launchui --componentFolder=./component  --executionFolder=./execution --outputFolder=./output'));
  process.exit(1);
}


program.on('--help', displayUsage);

program.parse(process.argv);


if (!program.componentFolder) {
  displayUsage();
} else {
  globalConfig.componentFolder = program.componentFolder;
}

if (!program.executionFolder) {
  displayUsage();
} else {
  globalConfig.executionFolder = program.executionFolder;
}

if (!program.executionFolder) {
  displayUsage();
} else {
  globalConfig.outputFolder = program.outputFolder;
}


// if (program.version) console.log('  - version');

app.listen(port, () => {
  open(`http://localhost:${port}`);
  process.env.globalConfig = JSON.stringify(globalConfig);
  log(chalk.yellow(`server starting on http://localhost:${port}`));
});
