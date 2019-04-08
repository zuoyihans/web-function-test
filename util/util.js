const {
  openUrl,
  input,
  click,
} = require('./constant');

const { actionOpenUrl } = require('../actions/openUrl');

function getOpenUrlActionDetail(action, params) {
  let actiondetail;
  if (action.param.startsWith('P_')) {
    actiondetail = {
      action: action.action,
      url: params[action.param],
    };
  } else {
    actiondetail = {
      action: action.action,
      url: action.param,
    };
  }
  return actiondetail;
}

function getActionDetail(action, params) {
  let actiondetal;
  switch (action.action) {
    case openUrl:
      actiondetal = getOpenUrlActionDetail(action, params);
      break;
    case input:
      break;
    case click:
      break;
    default:
      throw new Error(`unknow action ${action.action}`);
  }
  return actiondetal;
}

async function takeAction(actiondetail) {
  console.log('takeAction', actiondetail.action, actiondetail.url);
  const localactiondetail = { ...actiondetail };
  localactiondetail.snapshotname = `${actiondetail.caseid}-${actiondetail.scenarioid}-${actiondetail.actionid}.png`;
  switch (localactiondetail.action) {
    case openUrl:
      await actionOpenUrl(localactiondetail);
      break;
    case input:
      break;
    case click:
      break;
    default:
      throw new Error(`unknow action ${localactiondetail.action}`);
  }
}

module.exports.getActionDetail = getActionDetail;
module.exports.takeAction = takeAction;
