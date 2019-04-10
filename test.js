const puppeteer = require('puppeteer');
const srs = require('secure-random-string');

(async () => {
  // const browser = await puppeteer.launch({ headless: false });
  // const page = await browser.newPage();

  const result = srs({
    length: 8,
    alphanumeric: true,
  });
  console.log(result);
  

  // await browser.close();
})();

// 窗口切换
  // const page1 = await browser.newPage();
  // await page1.goto('https://github.com');
  // const page2 = await browser.newPage();
  // await page2.goto('https://www.baidu.com');
  // const pages = await browser.pages();
  // pages.forEach(async (page, index) => console.log(await page.title()));
  // await pages[0].bringToFront();

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