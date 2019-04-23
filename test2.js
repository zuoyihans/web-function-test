const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch(
      {
          headless: false,
          ignoreHTTPSErrors: true,
          args:[
              '--start-maximized'
          ]
      }
  );
  const page = (await browser.pages())[0];
  await page.goto('https://w3.ibm.com');
  await page.waitFor('body > div.awf-page.js-page.-has-masthead > header > div.js-user-container.masthead__user.-border-color-base > div > button');
  const signIn = await page.$('body > div.awf-page.js-page.-has-masthead > header > div.js-user-container.masthead__user.-border-color-base > div > button');
  console.log(signIn);
  await signIn.click();
  await page.waitFor('#desktop');
  await page.type('#desktop','szsh@cn.ibm.com');
  await page.type('#body > div.wrapper > div.inner > div > div > form > input[type="password"]:nth-child(4)','vote472RUNG782$%');
  await page.waitFor(3000);
  await page.keyboard.press('Enter');

})();