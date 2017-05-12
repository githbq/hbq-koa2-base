/**
 * 活动
 */
export default (route, { controller }) => {
    route.post('/', controller.bindAction('add', (ctx) => {
        return [ctx.request.fields]
    }))
    route.delete('/:_id', controller.bindAction('delete', (ctx) => {
        return [ctx.params]
    }))
    route.put('/:_id', controller.bindAction('update', (ctx) => {
        return [ctx.params, ctx.request.fields]
    }))
    route.get('/page/:pageSize/:pageIndex', controller.bindAction('getPage', (ctx) => {
        return [ctx.params, ctx.query]
    }))
    route.get('/:_id', controller.bindAction('getById', (ctx) => {
        return [ctx.params, ctx.query]
    }))
} 