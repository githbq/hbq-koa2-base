class KoaErr extends Error {
    constructor({ message = 'Error', status = 500 } = {}, ...args) {
        super()
        this.message = message
        this.status = status
        if (args.length > 0) {
            Object.assign(this, args[0])
        }
    }
}

export default () => {
    return async(ctx, next) => {
        ctx.Err = KoaErr;
        await next();
    }
}