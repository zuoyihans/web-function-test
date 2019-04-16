```json
{
  "componentFolder": "./example/component",
  "executionFolder": "./example/execution",
  "headless": false,
  "delay": 10,
  "viewPort": {
    "width": 1280,
    "height": 768
  },
  "outputFolder": "./example/output"
}
```

componentFolder指定组件目录

executionFolder指定case目录

headless为true是，执行过程在后台执行，看不到浏览器，false时能看到浏览器

delay指定每个步骤执行间隔的等待时间，此处设定为10毫秒

viewPort指定浏览器的长和宽，本例为1280*768

outputFolder指定测试结果存放目录