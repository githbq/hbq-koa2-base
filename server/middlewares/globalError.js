export default () => {
    return async(ctx, next) => {
        try {
            await next()
        } catch (err) { 
            ctx.body = global.JSONResponse(0, {stack:err.stack}, err.message)
            ctx.status = err.status || 500
        }
    }
}