# koa2-base typescript+koa2框架  **3.0**

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
//大大提高装库效率以及更精确版本处理
yarn
```

## 启动方式
##### 前提条件
> `npm run tsc:w` 或者 在vscode上使用快捷键 `ctrl+shit+b` 启动监听 typescript编译

#### 实时监听启动:用于开发环境
```
npm start  //使用本地mongodb环境
```

#### 支持pm2部署:用于生产环境

```
 npm run pm2
```

#### 实时监听并且在浏览器上打开对应端口的地址

```
npm run pstart
```

## 注意事项

1. `npm start` 执行的是 ts-node 不需要监听ts文件实时编译
2. `npm run start:build` 编译ts文件并且执行build后的入口文件
3. 需要开启mongodb 端口号:17951
    - 配置文件地址: /src/common/configs/appConfig.ts -> mongodb

### 环境变量

* NODE_ENV 环境变量有两个值
    - `development` 用于标识当前是开发环境
    - `test` 用于标识当前是测试环境  
    - `production` 用于标识当前是生产环境（正式上线环境）
* CONFIG_MODE 用于选择性配置启用哪一个配置文件
    `/src/common/configs/appConfig$-{CONFIG_MODE}`.ts
---

## 如何调试

- 推荐使用 [vscode](https://code.visualstudio.com)开发工具

### 在vscode下调试

1. 快捷键`ctrl+shift+b`会启动监听编译src->build，如果已经执行了`tsc -w`跳过这一步
2. 在想断点的代码行左侧单击标记小红点
3. 按 `F5` 启动调试
4. 将底部状态栏选项切换到 **调试控制台** 就可以看到程序输出信息了
---

## 目录结构

```
├── README.md
├── build
|  ├── app.js
|  ├── app.js.map
|  ├── common
|  ├── index.js
|  ├── index.js.map
|  └── server
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
├── test
|  ├── mocha.opts
|  └── readme.md
├── tsconfig.json
├── tslint.json
├── views
|  ├── ejs
|  └── pug
└── yarn.lock
```
