const puppeteer = require('puppeteer');
const srs = require('secure-random-string');

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('https://github.com');
  const title = await page.$x('/html/body/div[4]/main/div[1]/div/div/div[1]/h1');

  const text = await page.evaluate(xtitle => xtitle.textContent, title[0]);
  console.log(text);
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