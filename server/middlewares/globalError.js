export default () => {
    return async(ctx, next) => {
        try {
            await next();
        } catch (err) {
            ctx.body = global.JSONResponse(0, null, err.message);
            ctx.status = err.status || 500;
        }
    };
}