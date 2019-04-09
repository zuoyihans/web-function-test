const fs = require('fs');

async function readJsonFile(filepath) {
  const jsondata = JSON.parse(fs.readFileSync(filepath), 'utf-8');
  return jsondata;
}

function getCasefilelist(files) {
  const casefiles = [];
  files.forEach((file) => {
    if (file.startsWith('case') && file.endsWith('.json')) {
      casefiles.push(file);
    }
  });
  return casefiles;
}
function getScreenShotFileName(action) {
  return `${action.caseid}-${action.componentidx.toString().padStart(3, '0')}-${action.actionidx.toString().padStart(3, '0')}.png`;
}

module.exports.readJsonFile = readJsonFile;
module.exports.getCasefilelist = getCasefilelist;
module.exports.getScreenShotFileName = getScreenShotFileName;
