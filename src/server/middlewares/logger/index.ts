// import * as convert from 'koa-convert'
// import log4js from './log4js'
import * as color from 'cli-color'
/**
 * http日志
 */
export default () => {
    return async (ctx, next) => {
        if (appUtils.isDev()) {
            const start = Date.now()
            await next()
            const diff = Date.now() - start
            const msgs = [
                (ctx.method === 'POST' ? color.bgYellowBright.green : color.bgBlue)(`${ctx.method}`),
                color.cyan(`${ctx.url}`),
                (ctx.status >= 400 ? color.redBright : color.greenBright)(`[${ctx.status}]`),
                '-',
                color.yellow(`${diff}ms`)
            ]
            appUtils.log(msgs.join(' '))
        }
        else {
            await next()
        }
    }

    // if (!appUtils.isDev()) { 
    // return convert(log4js())
    // } else {
    //     return convert(logger())
    // }
}