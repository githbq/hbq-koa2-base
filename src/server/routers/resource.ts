/**
 * 资源
 */

export default (router, { controller }) => {
    router.post('/', controller.bindAction('add', async (ctx) => {
        return [ctx.request.body.fields, ctx.request.body.files]
    }))
    router.delete('/:_id', controller.bindAction('delete'))
    router.put('/:_id', controller.bindAction('update'))
    router.get('/page/:pageSize/:pageIndex', controller.bindAction('getPage'))
    router.get('/:_id', controller.bindAction('getById'))
} 