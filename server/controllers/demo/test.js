export default ({ debug, logger }) => {
    return {
        async page(ctx, next) {
            ctx.body = await DB.models.demo._getPage({ condition: {...ctx.query }, ...ctx.params })
        },
    }
}