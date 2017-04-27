export default {
    async page(ctx, next) {
        ctx.body = await DB.models.demo._getPage({ condition: {...ctx.query }, ...ctx.params })
    },
    async insert(ctx, next) {
        ctx.body = await DB.models.demo._add({ name: `name:${Math.random()}` })
    },
    async save(ctx, next) {
        ctx.body = await DB.models.demo.save()
    }
}