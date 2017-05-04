# 完全采用typescript重构,是时候扔掉babel了 let's go to typescript 
 
## 环境安装 
## 初始化操作
```
yarn 
``` 
## 启动方式

### 最简单启动方式 
``` 
npm start 
```
支持pm2部署 
```
 npm run pm2 
``` 
## 目录结构

```  
├── build 
├── doc
|  └── 如何使用.txt
├── package.json
├── public
|  └── favicon.ico
├── README.md
├── run.js
├── src
|  ├── app.ts
|  ├── common
|  ├── globals.d.ts
|  ├── index.test.ts
|  ├── index.ts
|  └── server
├── temp
|  └── logs
├── test
|  ├── mocha.opts
|  └── readme.md
├── tsconfig.json
├── tslint.json
├── upload
├── views
|  ├── ejs
|  └── pug
└── yarn.lock
```
 