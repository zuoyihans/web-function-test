const puppeteer = require('puppeteer');
const fs = require('fs');

async function click(page, xpath) {
  await page.waitForXPath(xpath);
  await (await page.$x(xpath))[0].click();
}

async function hover(page, xpath) {
  await page.waitForXPath(xpath);
  const object = (await page.$x(xpath))[0];
  await object.hover();
}

(async () => {
  let tmpXpath;
  const browser = await puppeteer.launch(
    {
      headless: false,
      ignoreHTTPSErrors: true,
      args: [
        '--start-maximized',
      ],
      slowMo: 30,
    },
  );
  const page = (await browser.pages())[0];
  await page.goto('https://wd5.myworkday.com/ibm/d/home.htmld');
  const userNameXpath = '//*[@id="desktop"]';
  const passWordXpath = '//*[@id="body"]/div[1]/div[2]/div/div/form/input[4]';
  await page.waitForXPath(userNameXpath);
  await (await page.$x(userNameXpath))[0].type('wuhd@cn.ibm.com');
  await (await page.$x(passWordXpath))[0].type('whd1234567890-=');
  const loginXpath = '//*[@id="btn_signin"]';
  await (await page.$x(loginXpath))[0].click();
  await click(page, '//*[@data-automation-id="tdWidget"]/div[2]/button');
  await click(page, '//*/button[@data-automation-id="Current_User"]');
  await click(page, '//*/div[@data-automation-id="hammy_profile_link"]');
  await click(page, '//*/button[@data-automation-id="relatedActionsButton"]');
  await hover(page, '//*/div[@data-automation-label="Employee"]');
  await click(page, '//*/div[@data-automation-label="Compensation Statements"]');
  await page.goto('https://ibm.biz/payslipLite');
  
  await click(page, '//*[@id="page-content-wrapper"]/div/div/table/tbody[2]/tr[1]/td[2]/a');
  await page.setRequestInterception(true);
  page.on('requestfinished', async (request) => {
    const requesturl = request.url();
    console.log(requesturl);
    if (requesturl.endsWith('statement')) {
      console.log('pdf request');
      const resonse = await request.response();
      const data = await resonse.buffer();
      fs.writeFile('payslip.pdf', data, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
      });
    }
  });
})();
