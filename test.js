const puppeteer = require('puppeteer');
const srs = require('secure-random-string');

(async () => {
  const browser = await puppeteer.launch(
    {
      headless: false,
      args: ['--window-size=1280,768'],
      defaultViewport: {
        width: 1280,
        height: 768,
      },
    },
  );
  const page = await browser.newPage();
  await page.goto('http://9.197.12.28:3000');
  
  await (await page.$x('//*[@id="userid"]'))[0].type('admin');
  await (await page.$x('//*[@id="password"]'))[0].type('12345');
  await (await page.$x('/html/body/div/div/div/section/form/div[3]/a'))[0].click();
  await page.waitForXPath('//*[@id="sidebar-menu"]/div/ul/li[1]/ul/li[2]/a');
  await (await page.$x('//*[@id="sidebar-menu"]/div/ul/li[1]/ul/li[2]/a'))[0].click();
  console.log('done1');
  await page.waitForXPath('/html/body/div[1]/div/div[3]/div/div[3]/div/div[4]/button');
  await (await page.$x('//*[@id="reservation"]'))[0].type('03/13/2019 - 04/11/2019');
  await (await page.$x('//*[@id="reservation"]'))[0].click();

  console.log('done2');
  await page.waitForXPath('/html/body/div[2]/div[1]/ul/li[4]');

  await (await page.$x('/html/body/div[2]/div[1]/ul/li[4]'))[0].click();
  console.log('done3');
  await (await page.$x('/html/body/div[1]/div/div[3]/div/div[3]/div/div[4]/button'))[0].click();
  console.log('done4');
  const finalResponse = await page.waitForResponse((response) => {
    console.log(response.url(), response.status());
    return true;
  });
  
  console.log('test', finalResponse.ok());
  console.log('done');
  // await browser.close();
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