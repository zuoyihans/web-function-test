/**
 * Created by chance on 16-12-23.
 */
const express = require('express');
const fs = require('fs');
const jsonfile = require('jsonfile');

const { getCasefilelist, readJsonFile } = require('../../util/util');
const { log } = require('../../util/log');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('main');
});


router.get('/components', (req, res) => {
  const { componentFolder } = process.env;
  const componentfiles = fs.readdirSync(componentFolder);
  res.json({
    componentFolder,
    componentfiles,
  });
});

router.get('/cases', (req, res) => {
  const { executionFolder } = process.env;
  const files = fs.readdirSync(executionFolder);
  const casefilelist = getCasefilelist(files);
  res.json({
    executionFolder,
    casefilelist,
  });
});

router.get('/paramfile', (req, res) => {
  const { executionFolder } = process.env;
  const paramexists = fs.existsSync(`${executionFolder}/param.json`);
  if (paramexists) {
    res.json({
      paramfile: `${executionFolder}/param.json`,
    });
  } else {
    res.json({
    });
  }
});

router.get('/component/:filename', (req, res) => {
  const { executionFolder } = process.env;
  const caseinfo = readJsonFile(`${executionFolder}/${req.params.filename}`);
  res.json(caseinfo);
});

router.get('/paramdata', (req, res) => {
  const { executionFolder } = process.env;
  const paramdata = readJsonFile(`${executionFolder}/param.json`);
  res.json(paramdata);
});

router.get('/case/:filename', (req, res) => {
  const { componentFolder } = process.env;
  const componentinfo = readJsonFile(`${componentFolder}/${req.params.filename}`);
  res.json(componentinfo);
});

router.post('/jsonfile', (req, res) => {
  const { filepath, filedata } = req.body;
  jsonfile.writeFile(filepath, filedata, { spaces: 2, EOL: '\r\n' }, (writeerr) => {
    if (writeerr) {
      log.error(writeerr);
      res.status(500).send(writeerr);
      return;
    }
    res.json({
      result: 'done',
    });
  });
});

module.exports = router;
