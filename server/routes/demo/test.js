 
const ioHelper = appUtils.requireCommon('ioHelper');
export default (route) => {
    route.get('/a', async(ctx, next) => {
        let content = '---';
        ctx.session.aaa = '312231231';
        ctx.state = {
            title: 'koa2 111',
            data: JSON.stringify(content)
        };
        await ctx.render('pug/tests.pug');
    });
    route.get('/data', async(ctx, next) => {
        ctx.body = global.JSONResponse(1, { a: 1, b: 2, c: 3 }, '成功');
    }); 
    route.get('/c', async(ctx, next) => {
        await ctx.send(ctx, 'index.html', { root: 'public/html' });
    }); 
};