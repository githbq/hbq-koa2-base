# Koa2-base typescript + koa2 framework

## A complete koa2 typescript development framework   

## Howto use it      

```
npm i -g iclone-cli // scaffolding will clear the remote git information automatically loaded library
iclone init -t koa -n [custom project name] // create a new project in the current directory with the project name

Or direct cloning
git clone https://github.com/githbq/hbq-koa2-base.git   
```

## Environmental requirements              
- nodejs > 7.6      
- Development tools: vscode best    

## Initialize the operation        
```     
// greatly improve the efficiency of the installation and more accurate version processing     
yarn    
```     

## start mode     
#### Real-time monitoring start: for the development environment          
```         
npm start  // use local mongodb environment 27017 port
``` 

#### Support for pm2 deployment: for production environments             
```
 npm run pm2 
```  

####  Real-time monitoring and opening the address of the corresponding port on the browser        
```     
npm run pstart      
```         

## Precautions          
1.  `npm start` implementation of the ts-node does not need to monitor the ts file real-time compiler
2. `npm run start:build` Compiles the ts file and executes the build file after build

### environment variable                
* The NODE_ENV environment variable has multiple values     
    - `development` is used to identify the current development environment
    - `test` is used to identify the current test environment
    - `production` is used to identify the current product environment (formal on-line  
* CONFIG_MODE is used to selectively configure which configuration file to enable      
    - `/src/common/configs/appConfig$-{CONFIG_MODE}`.ts 
---          

## How to debug         
- It is recommended to use [vscode] (https://code.visualstudio.com)

### Debugging under vscode              
- Shortcuts `ctrl + shift + b` will start a one-time compilation         
- Adjust the compilation for real-time monitoring, please change .vscode/tasks.json yourself         
- will be the corresponding task property `isBuildCommand:true` 

## Swagger Api

https://npm.taobao.org/package/koa2-swagger-ui

---             

##  Directory Structure          
```  
├── build
|  ├── app.js 
├── doc
|  └── howto.txt
├── package.json
├── public
|  └── favicon.ico
├── README.md
├── run.js
├── src
|  ├── app.ts 
├── temp
|  ├── logs
|  └── min-image
├── test 
├── tsconfig.json
├── tslint.json
├── upload 
├── views
|  ├── ejs
|  └── pug
└── yarn.lock
```
 
 