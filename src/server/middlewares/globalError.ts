export default () => {
    return async (ctx, next) => {
        try {
            await next()
        } catch (err) {
            ctx.status = err.status || 500
            ctx.body = JSONResponse(0, { stack: err.stack }, err.message)
        }
    }
}