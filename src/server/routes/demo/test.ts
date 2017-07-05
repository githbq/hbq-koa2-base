/**
* Test
*/ 
export default (route, { controller }) => {
    route.get('/ejs', async (ctx, next) => {
        await ctx.render('ejs/index.html', { title: 'Iam ejs' })
    }) 
    route.get('/a', async (ctx, next) => {
        ctx.body = JSONResponse(1, { a: 1, b: 2, c: 3 }, '成功')
    }) 
    //////////
    route.post('/', controller.bindAction('add'))
    route.delete('/:_id', controller.bindAction('delete'))
    route.put('/:_id', controller.bindAction('update'))
    route.get('/page/:pageSize/:pageIndex', controller.bindAction('getPage'))
    route.get('/:_id', controller.bindAction('getById'))
} 