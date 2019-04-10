# web-function-test

基于Chromium内核的自动化测试工具，用户只需要定义测试流程和数据，完全不需要代码

##  申明
基于[puppeteer](https://github.com/GoogleChrome/puppeteer)开发的web应用程序自动化测试

还在开发过程，目前只能演示一下到底能干啥。

## 前提
MAC + Node.JS环境，windows没试过也懒得试了

## quick start

安装
```
npm install -g @cic-digital/web-function-test
```

假如我们的测试对象是github，我们想登陆github，更改status为busy，再取消status

注:以下文件都可以在exapmle目录下找到

先创建2个目录，一个存放我们的自动化测试组件，一个存放测试用例和数据
```
mkdir example
mkdir example/component
mkdir example/execution
```
在component目录下，创建以下4个json格式的组件，内容就不详细解释了，看了基本应该可以明白

001_打开github.json
```json
{
  "description": "打开github登录页面的URL",
  "actions": [
    {
      "description": "打开url",
      "actionType": "openUrl",
      "actionParam": "P_GitHubUrl"
    }
  ]
}
```
002_登录github.json
```json
{
  "description": "使用指定账号登录github",
  "actions": [
    {
      "description": "输入用户名",
      "actionType": "input",
      "objectXpath": "//*[@id=\"login_field\"]",
      "actionParam": "P_UserName"
    },
    {
      "description": "输入密码",
      "actionType": "input",
      "objectXpath": "//*[@id=\"password\"]",
      "actionParam": "P_Password"
    },
    {
      "description": "点击登录按钮",
      "actionType": "click",
      "objectXpath": "//*[@id=\"login\"]/form/div[3]/input[4]"
    }
  ]
}
```
003_设置status.json
```json
{
  "description": "设置status",
  "actions": [
    {
      "description": "点击上部菜单头像图标",
      "actionType": "click",
      "objectXpath": "/html/body/div[1]/header/div[7]/details/summary/span"
    },
    {
      "description": "点击set your status",
      "actionType": "click",
      "objectXpath": "/html/body/div[1]/header/div[7]/details/details-menu/div[3]/div/details/summary/div[2]/span"
    },
    {
      "description": "操作busy checkbox",
      "actionType": "checkbox",
      "actionParam": "P_BusyCheckBox",
      "objectXpath": "//*[@id=\"limited-availability-truncate-true\"]"
    },
    {
      "description": "点击Set status按钮",
      "actionType": "click",
      "objectXpath": "/html/body/div[1]/header/div[7]/details/details-menu/div[3]/div/details/details-dialog/form/div[3]/button[1]"
    },
    {
      "description": "重新点击上部菜单头像图标，收回菜单",
      "actionType": "click",
      "objectXpath": "/html/body/div[1]/header/div[7]/details/summary/span"
    }
  ]
}
```
004_清除status.json
```json
{
  "description": "清除status",
  "actions": [
    {
      "description": "点击上部菜单头像图标",
      "actionType": "click",
      "objectXpath": "/html/body/div[1]/header/div[7]/details/summary/span"
    },
    {
      "description": "点击status图标",
      "actionType": "click",
      "objectXpath": "/html/body/div[1]/header/div[7]/details/details-menu/div[3]/div/details/summary/div[1]/div[2]"
    },
    {
      "description": "点击Clear status按钮",
      "actionType": "click",
      "objectXpath": "/html/body/div[1]/header/div[7]/details/details-menu/div[3]/div/details/details-dialog/form/div[3]/button[2]"
    },
    {
      "description": "重新点击上部菜单头像图标，收回菜单",
      "actionType": "click",
      "objectXpath": "/html/body/div[1]/header/div[7]/details/summary/span"
    }
  ]
}
```
组件是最小的可重用单位，我们的测试用例就是对组件的组合，接下来我们创建一个测试用例，测试用例必须为小写case开头,存放在execution目录

case001_democase.json
```json
[
  {
    "component": "001_打开github"
  },
  {
    "component": "002_登录github"
  },
  {
    "component": "003_设置status"
  },
  {
    "component": "004_清除status"
  }
]
```
从内容上就可以理解，我们要按顺序来执行这4个组件。

创建一个配置文件config.json
```json
{
  "componentFolder": "./example/component",
  "executionFolder": "./example/execution",
  "headless": true,
  "delay": 10,
  "viewPort": {
    "width": 1280,
    "height": 768
  }
}
```

componentFolder指定刚才创建的组件目录

executionFolder指定刚才创建的case目录

headless为true是，执行过程在后台执行，看不到浏览器，false时能看到浏览器

delay指定每个步骤执行间隔的等待时间，此处设定为10毫秒

viewPort指定浏览器的长和宽

运行一下命令format我们的case文件，以及创建参数文件，参数文件如存在，会相应更新，不会覆盖原有已经输入的参数
```
updateExecution ./config.json
```

执行完后可以在execution目录下找到param.json文件,填入相应的值
```json
{
  "qlZmNnZL": {
    "P_GitHubUrl": "http://github.com/login"
  },
  "YrykIaGo": {
    "P_UserName": "your github user",
    "P_Password": "your github password"
  },
  "xDmglawn": {
    "P_BusyCheckBox": "Checked"
  },
  "bfqTchEQ": {}
}
```

注：qlZmNnZL为随机生成的key，各自不同，为执行程序做匹配用，请勿自行更改

执行测试
```
runwebtest ./config.json
```

执行完毕后，可以在当前目录找到截图
