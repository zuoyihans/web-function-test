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

加入我们的测试对象是github，我们想登陆github，更改status为busy，再取消status

以下文件都可以在exapmle目录下找到

先创建2个目录，一个存放我们的自动化测试组件，一个存放测试用例和数据
```
mkdir example
mkdir example/component
mkdir example/execution
```
在component目录下，放做以下4个组件，内容就不详细解释了，看了基本应该可以明白

001_打开github.json
```JSON
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

填上你的github账号和密码,保存退出

```
runwebtest config.json
```

然后在web-function-test目录下找到截图