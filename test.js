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
    },
  );
  // const page = (await browser.pages())[0];
  // await page.goto('http://www.baidu.com');
  const page = await browser.newPage();
  await page.goto('http://www.w3school.com.cn/tiy/t.asp?f=html_elements_select');
  const frames = await page.frames();
  let myframe;
  for (let i = 0; i < frames.length; i += 1) {
    const framename = frames[i].name();
    console.log(framename);
    if (framename === 'i') {
      myframe = frames[i];
      break;
    }
  }
  await myframe.select('select[name="cars"]', 'saab'); // single selection
  console.log(myframe.name());
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