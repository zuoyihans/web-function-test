/* eslint-disable no-await-in-loop */

const puppeteer = require('puppeteer');
const pptrFirefox = require('puppeteer-firefox');
const devices = require('puppeteer/DeviceDescriptors');
const iPhone = devices['iPhone XR'];
// const srs = require('secure-random-string');

(async () => {
  const browser = await puppeteer.launch(
    {
      headless: false,
      // args: ['--window-size=1280,768'],
      defaultViewport: {
        width: 1920,
        height: 1280,
      },
      slowMo: 30,
    },
  );
  const page = await browser.newPage();
  await page.goto('http://rrys2019.com/');
  const xpath = '/html/body/div[5]/dl[1]/dt/h2';
  await page.waitForXPath(xpath);
  const title = await page.$x(xpath);
  console.log(title.length);
  const text = await page.evaluate(targetObject => targetObject.textContent, title[0]);
  console.log('目前最新', text);
  const titlexpath = '/html/body/div[5]/dl[1]/dd/p';
  await page.waitForXPath(titlexpath);
  const downloadtitles = await page.$x('/html/body/div[5]/dl[1]/dd/p');
  const downloadlinks = await page.$x('/html/body/div[5]/dl[1]/dd/div/a');
  for (let i = 0; i < downloadtitles.length; i += 1) {
    const downloadtitle = await page.evaluate(targetObject => targetObject.textContent, downloadtitles[i]);
    console.log(downloadtitle);
    const downloadlink = await page.evaluate(targetObject => targetObject.href, downloadlinks[i]);
    console.log(downloadlink);

  }

  
  // await page.goto('https://w3.ibm.com/');
  // await page.waitForXPath('/html/body/div[3]/header/div[5]/div/button/strong');
  // const signin = await page.$x('/html/body/div[3]/header/div[5]/div/button/strong');
  // await signin[0].click();
  // await page.waitForXPath('//*[@id="desktop"]');
  // const username = await page.$x('//*[@id="desktop"]');
  // const password = await page.$x('//*[@id="body"]/div[1]/div[2]/div/div/form/input[4]');
  // await username[0].type('wuhd@cn.ibm.com');
  // await password[0].type('12345');
  // await page.waitForXPath('//*[@id="btn_signin"]');

  // const button = await page.$x('//*[@id="btn_signin"]');
  // console.log(button);
  // await button[0].click();
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