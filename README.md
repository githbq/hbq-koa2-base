# koa2Base后台
 
## 环境安装 
## 初始化操作
```
yarn
或者
npm i  
```

 
## 启动方式

### 最简单启动方式 
```
最常用的集成nodemon的方式,代码变动会自动重载(其实就是nodemon去执行bin/run)
npm start
或者
node bin/run
```
支持pm2部署

```
 npm run pm2 
``` 
## 目录结构

```  
├── bin
|  ├── run
|  └── www
├── common
|  ├── configs
|  ├── ioHelper.js
|  ├── libs
|  ├── momentHelper.js
|  ├── npmHelper.js
|  ├── pm2Helper.js
|  ├── requireHelper.js
|  └── spawnHelper.js
├── doc
|  └── 如何使用.txt
├── public
|  └── favicon.ico
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
├── upload
├── app.js
├── package.json
├── README.md
└── yarn.lock
```
 