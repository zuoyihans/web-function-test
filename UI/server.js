const chalk = require('chalk');
const open = require('open');

const app = require('./app');

const { log } = console;
const port = process.env.PORT || '3000';

app.listen(port, () => {
  open(`http://localhost:${port}`);
  log(chalk.yellow(`server starting on http://localhost:${port}`));
});
