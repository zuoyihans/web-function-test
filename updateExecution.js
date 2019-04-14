#!/usr/bin/env node
const { updateExecution } = require('./index');

(async () => {
  await updateExecution(process.argv[2]);
})();
