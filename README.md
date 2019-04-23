# web-function-test

![Chinese](README_CN.md)

web-automation-testing tool run on Chromium, by using this tool , user only need to define business process and test data, no coding required.but XPATH is required.

##  申明
it wat developed based on [puppeteer](https://github.com/GoogleChrome/puppeteer)

it's WIP , only very basic function was done, and I will show you what can be done so far. Demo shows how to test bootstrap example page.

[demo](http://file.chinacic-next.com/demo.mov)

## 前提
Node.JS enviroment is required

## quick start

install
```
npm install -g @cic-digital/web-function-test
```

open terminal , go to an empty folder , init it
```
wft init
```

init example
```
wft example
```
wft example command can not be used twice please empty your folder before you use it again.

Every this is fine, just run your test
```
wft run
```
after run command，find your snapshot in ./output/yyyymmddhhmmss

## what happened

business process was break down to component defined in "component" folder, after component defined , you can defined your test case, sample can be found in ./execution/case*.json, test data can be found in ./execution/param.json.

##  Basic Concept
![avatar](basicconcept.png)

## how to use it(WIP)
we will provide web user interface for edit all json file later.
```
wft ui
```

by default , web ui use port 3000, if it is used by other application
```
PORT={PORT} wft ui
```
change the {PORT} to the port number you want

