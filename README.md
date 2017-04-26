# koa2-base  nodejs restful 后端
 
## 环境安装 
## 初始化操作
```
yarn 
``` 
## 启动方式

### 最简单启动方式 
```
最常用的集成nodemon的方式,代码变动会自动重载(其实就是nodemon去执行bin/run)
npm start 
```
支持pm2部署

```
 npm run pm2 
``` 
## 目录结构

```  
├── app.js
├── bin
|  ├── run
|  └── www
├── common
|  ├── configs
|  ├── ioHelper.js
|  ├── libs
|  ├── momentHelper.js
|  └── requireHelper.js
├── doc
|  └── 如何使用.txt
├── package.json
├── public
|  └── favicon.ico
├── README.md
├── server
|  ├── appUtils.js
|  ├── database
|  ├── index.js
|  ├── inits
|  ├── middlewares
|  ├── routes
|  ├── sockets
|  ├── test
|  └── views
├── temp 
├── upload 
└── yarn.lock
```
 