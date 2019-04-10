# web-function-test

基于Chromium内核的自动化测试工具，用户只需要定义测试流程和数据，完全不需要代码

##  申明
基于[puppeteer](https://github.com/GoogleChrome/puppeteer)开发的web应用程序自动化测试

还在开发过程，目前只能演示一下到底能干啥。



## quick start

```
npm install -g @cic-digital/web-function-test
git clone https://github.com/k19810703/web-function-test.git
cd web-function-test
vim ./example/execution/param.json
```

填上你的github账号和密码,保存退出

```
runwebtest config.json
```

然后在web-function-test目录下找到截图