const format = require('string-format');

const a = '/html/body/div/div[2]/div[1]/ul/li/div/h6[contains(.,\'{P_CartName}\')]';

console.log(format(a, {
  P_CartName: 'xxxx',
}));
