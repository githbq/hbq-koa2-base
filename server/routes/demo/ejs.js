export default (route) => {
    route.get('/', async(ctx, next) => {
        await ctx.render('ejs/index.html', { title: 'Iam ejs' });
    });
}