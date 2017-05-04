export default () => {
    return async (ctx, next) => {
        const start: any = new Date()
        await next()
        const ms: any = (new Date()) as any - start
        appUtils.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
    }
}