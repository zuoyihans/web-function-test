const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('https://github.com');
  await page.screenshot(
    {
      path: '1.png',
      fullPage: true,
    }
  );
  const login = await page.$x('//*[@id="user[login]"]');
  // console.log(login);
  login[0].type('k19810703');
  // await browser.close();
})();
