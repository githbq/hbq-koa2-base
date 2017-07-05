// Import * as convert from 'koa-convert'
// Import log4js from './log4js'
/**
* Http log
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