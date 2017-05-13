// import * as convert from 'koa-convert'
// import log4js from './log4js'
/**
 * http日志
 */
export default () => {
    return async (ctx, next) => {
        const start: number = new Date().getTime()
        await next()
        const ms = (new Date().getTime()) - start
        appUtils.log(`${ctx.method} ${ctx.url} [${ctx.status}] - ${ms}ms`)
    }

    // if (!appUtils.isDev()) { 
    // return convert(log4js())
    // } else {
    //     return convert(logger())
    // }
}