/**
 * Created by chance on 16-12-23.
 */
const express = require('express');
const fs = require('fs');
const jsonfile = require('jsonfile');
const path = require('path');
const srs = require('secure-random-string');
const _ = require('lodash');

const { getCasefilelist, readJsonFile } = require('../../util/util');
const { log } = require('../../util/log');

const router = express.Router();
const buildPath = path.join(__dirname, 'APP', 'app', 'build');

router.get('/', (req, res) => {
  // res.render('main');
  res.sendFile(path.join(__dirname, buildPath, 'index.html'));
});


router.get('/components', (req, res) => {
  const { componentFolder } = process.env;
  const queryfiles = fs.readdirSync(componentFolder);
  const queryFolder = componentFolder;
  res.json({
    queryFolder,
    queryfiles,
  });
});

router.get('/executions', (req, res) => {
  const { executionFolder } = process.env;
  const queryfiles = fs.readdirSync(executionFolder);
  const queryFolder = executionFolder;
  res.json({
    queryFolder,
    queryfiles,
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
      paramfile: readJsonFile(`${executionFolder}/param.json`),
    });
  } else {
    res.json({
    });
  }
});

router.get('/component/:filename', (req, res) => {
  const { componentFolder } = process.env;
  const caseinfo = readJsonFile(`${componentFolder}/${req.params.filename}`);
  res.json(caseinfo);
});

router.get('/execution/:filename', (req, res) => {
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
router.post('/jsonfile4parm', (req, res) => {
  const { filepath, filedata } = req.body;
  let parmJson = readJsonFile(filepath);
  parmJson = {
    ...parmJson,
    ...filedata.parmJson,
  };
  parmJson = _.omit(parmJson, filedata.deleteKey);
  jsonfile.writeFile(filepath, parmJson, { spaces: 2, EOL: '\r\n' }, (writeerr) => {
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

router.delete('/jsonfile', (req, res) => {
  const { filepath } = req.body;
  fs.unlink(filepath, (err) => {
    if (err) {
      log.error(err);
      res.status(500).send(err);
    }
    res.send(`deleted file: ${filepath}`);
  });
});

router.post('/renamejsonfile', (req, res) => {
  const { oldfilepath, newfilepath } = req.body;
  fs.rename(oldfilepath, newfilepath, (err) => {
    if (err) {
      log.error(err);
      res.status(500).send(err);
    }
    res.send(`renamed from ${oldfilepath}to ${newfilepath}`);
  });
});

router.get('/ukey8length', (req, res) => {
  const uKey = srs({
    length: 8,
    alphanumeric: true,
  });
  res.json({ uKey });
});

module.exports = router;
