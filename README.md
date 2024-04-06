## Docs

See our [docs and guides here](https://electron-react-boilerplate.js.org/docs/installation)

## package.json build config

```json
// 构建信息
build:{
  "productName":"", // 打包后的名字
  "appId":"org.erb.MailChecker", // 包名
  "dmg":{},
  "win":{
    "artifactName": "mc-${version}.${ext}",// 构建文件名
  },
   "publish": { // 自动更新地址？
      "provider": "generic",
      "url": ""
    },
}

// release / app / package.json
{
  "name":'' , // 构建的名字
  "version":"", // 版本
}
```

## 流程

1. 导入账密文件，解析。
2. 连接邮箱。
   ---下面这个封装单独的入口，后面可以勾选
3. 搜索邮件中是否有linkedin
4. 打开忘记密码，过验证，发送邮箱验证码。
5. 轮询邮箱，拿到验证码邮件，解析验证码
6. 把验证码填入页面
