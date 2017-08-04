/**
 * 定义全局智能提示
 */

// declare namespace myLib {
//     export function encodechar(data: any, opts?: any)
// }  
//log4js 日志对象
declare var LOGGER: any
//应用程序工具库
declare var appUtils: any
//JSONResponse 统一json格式化输出
declare var JSONResponse: (status: number, data: any, message?: string, otherData?: any) => { status: number, data: any, message: string }
//当前程序的配置模式,默认是'' 此时走 src/common/configs/appConfig.ts 如果设为26 则使用 src/common/configs/appConfig-26.ts
declare var CONFIG_MODE: string
//指向 src/common 的绝对路径
declare var COMMON_PATH: string
//node程序的运行环境状态 development | test | production
declare var NODE_ENV: string
//指向cwd
declare var ROOT_PATH: string
//持久化的缓存库对象
declare var APP_CACHE: any
// lodash  现在定义到-> shims.d.ts
// declare var _: any
//数据库操作对象 
declare var DB: { models: any, mongoose: any }