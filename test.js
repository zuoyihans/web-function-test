const puppeteer = require('puppeteer');
// const srs = require('secure-random-string');

(async () => {
  const browser = await puppeteer.launch(
    {
      headless: false,
      args: ['--window-size=1280,768'],
      defaultViewport: {
        width: 1280,
        height: 768,
      },
      slowMo: 30,
    },
  );
  const page = await browser.newPage();
  await page.goto('https://w3.ibm.com/');
  await page.waitForXPath('/html/body/div[3]/header/div[5]/div/button/strong');
  const signin = await page.$x('/html/body/div[3]/header/div[5]/div/button/strong');
  await signin[0].click();
  await page.waitForXPath('//*[@id="desktop"]');
  const username = await page.$x('//*[@id="desktop"]');
  const password = await page.$x('//*[@id="body"]/div[1]/div[2]/div/div/form/input[4]');
  await username[0].type('wuhd@cn.ibm.com');
  await password[0].type('12345');
  await page.waitForXPath('//*[@id="btn_signin"]');

  const button = await page.$x('//*[@id="btn_signin"]');
  console.log(button);
  await button[0].click();
})();

// 窗口切换

// frame + checkbox
// await page.goto('http://www.w3school.com.cn/tiy/t.asp?f=html_input_checkbox');
// const frames = await page.frames();
// let myframe;
// for (let i = 0; i < frames.length; i += 1) {
//   const framename = frames[i].name();
//   if (framename === 'i') {
//     myframe = frames[i];
//     break;
//   }
// }
// console.log(myframe.name());
// const object = (await myframe.$x('/html/body/form/input[1]'))[0];
// const status1 = await myframe.evaluate(el => { return el.checked; }, object);

// console.log('object1', status1);
// await object.click();
// const status2 = await myframe.evaluate(el => { return el.checked; }, object);

// console.log('object2', status2);

// download sample
// const client = await page.target().createCDPSession();
// await client.send('Page.setDownloadBehavior', {
//   behavior: 'allow', downloadPath: '/Users/wuhuidong/Documents/Workspace/web-function-test',
// });
// await page.goto('https://nodejs.org/en/');
// const downloadbutton = (await page.$x('/html/body/div/div/div/div[1]/a'))[0];
// await downloadbutton.click();