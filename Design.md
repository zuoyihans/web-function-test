# 设计方案
以可执行程序方式提供，执行需指定”测试用例组“，”业务流程定义“，”参数组”3类数据文件

## 传入参数

### 业务流程定义
定义业务流程模块，为可重用组件，一个业务流程模块需要定义一组操作，每个操作定义操作的对象，所需的参数。

业务流程例
```javascript
{
  login: {
    description: '登录xxx产品',
    actions: [
      {
        actionKey: 10,
        description: '输入用户名',
        action: 'input',
        // 操作的参数，此处为输入的内容
        actionParam: 'username',
        // xpath {id}为名为id的参数
        object: 'xxxx{id}',
        // 定位object的参数，可以不指定
        objectParams: ['id'],
      },
      {
        actionKey: 20,
        description: '输入密码',
        action: 'input',
        // 操作的参数，此处为输入的内容
        actionParam: 'password',
        // xpath {id}为名为id的参数
        object: 'xxxx{id}',
        // 所需参数
        objectParams: ['id'],
      },
      {
        actionKey: 30,
        description: '点击登录按钮',
        action: 'click',
        // xpath {id}为名为id的参数
        object: 'xpath-for-button',
        // 所需参数
        objectParams: [],
      },
    ],
  },
  xxxBiz: {
    // xxx业务功能
  }
  logout:{
    // 登出
  }
}
```

### 测试用例和参数
测试用例为一个数组，由用户自由指定业务流程模块来组合，CLI生成变换后测试用例参数文件模板，以一定的规则命名，如 xxxx.case.js xxxx.param.js

测试用例组例(用户指定)
```javascript
{
  description: 'xxxx业务',
  components: [
    'login',
    'xxxBiz',
    'logout',
  ]
}

```
测试用例组例(工具变换后)
```javascript
{
  description: 'xxxx业务',
  components: [
    {
      ukey: 'xxxx',
      component: 'login',
    },
    {
      ukey: 'yyyy',
      component: 'xxxBiz',
    },
    {
      ukey: 'zzzz',
      component: 'logout',
    },
  ]
}
```

参数例模板
```javascript
{
  login_xxxx_username: '',
  login_xxxx_id: '',
  login_yyyy_password: '',
  login_yyyy_id: '',
  // 略
}
```
