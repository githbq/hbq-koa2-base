import send from 'koa-send';
export default () => {
    return async(ctx, next) => {
        ctx.send = send;
        await next();
    }
}