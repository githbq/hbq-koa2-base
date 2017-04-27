export default (route) => {
    route.noController=true;
    route.get('/', async(ctx, next) => {
        await ctx.render('ejs/index.html', { title: 'Iam ejs' })
    })
}