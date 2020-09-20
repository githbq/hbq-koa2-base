# koa2-base typescript+koa2框架  **3.1**

一个完整的 koa2 typescript 开发框架

## 环境要求

nodejs > 7.6
开发工具：vscode 最佳

## 使用方式

``` 
git clone https://github.com/githbq/hbq-koa2-base.git
```

## 初始化操作

``` 
yarn
// or 
npm i 
```

## 启动方式

``` shell
# 直接由ts-node引导入口文件无需编译,代码变更时由 `nodemon` 重新启动服务
npm start 
```

 

#### 支持pm2部署: 用于生产环境

``` 
 npm run pm2
```

#### 实时监听并且在浏览器上打开对应端口的地址

``` 
npm run pstart
```

## 注意事项

1. `npm start` 执行的是 `ts-node` 引导 `src/index.ts` 不需要再监听ts文件实时编译
2. 默认不主动链接mongodb，对应配置如下
    - `/src/common/configs/appConfig.ts`
        - useMongodb: false,
        - mongodb: 'mongodb://127.0.0.1:17951/koa2Base',

### 环境变量

* `NODE_ENV` 环境变量有两个值
    - `development` 用于标识当前是开发环境
    - `test` 用于标识当前是测试环境  
    - `production` 用于标识当前是生产环境（正式上线环境）
* `CONFIG_MODE` 用于选择性配置启用哪一个配置文件

 `/src/common/configs/appConfig$-{CONFIG_MODE}.ts`
---

## 如何调试

* 推荐使用 [vscode](https://code.visualstudio.com)开发工具

### 在vscode下调试

1. 快捷键 `ctrl` + `,`
2. 搜索 `自动附加` 或者 `autoAttach` 设置为true
3. `npm run debug`
---

## 目录结构

``` 
├── README.md
├── __tests__
|  ├── index.test.ts
|  └── readme.md
├── build
|  ├── app.js
|  ├── app.js.map
|  ├── common
|  ├── index.js
|  ├── index.js.map
|  └── server
├── jest.config.js
├── package.json
├── public
|  ├── common
|  ├── favicon.ico
|  ├── index.html
|  ├── libs
|  └── pages
├── run.js
├── src
|  ├── app.ts
|  ├── common
|  ├── globals.d.ts
|  ├── index.test.ts
|  ├── index.ts
|  ├── server
|  └── shims.d.ts
├── temp
|  └── logs
├── temp.upload
├── tsconfig.json
├── tslint.json
├── upload
├── views
|  ├── ejs
|  └── pug
└── yarn.lock
```
