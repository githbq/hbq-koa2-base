import * as send from 'koa-send'
export default () => {
    return async (ctx, next) => {
        ctx.send = (filename, options?) => {
            return send(ctx, filename, { root: APP_CONFIG.staticPath, ...options })
        }
        await next()
    }
}