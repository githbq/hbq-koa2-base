export default () => {
    return async(ctx, next) => {
        const start = new Date();
        await next();
        const ms = new Date() - start;
        appUtils.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
    }
}