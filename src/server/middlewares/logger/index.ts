import * as convert from 'koa-convert'
import * as logger from 'koa-logger'
import log4js from './log4js'
export default () => {
    //日志
    // if (!appUtils.isDev()) { 
    return convert(log4js())
    // } else {
    //     return convert(logger())
    // }
}