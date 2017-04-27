import koaRouter from 'koa-router'
//根路由
const route = koaRouter()
export default {
    init(app, { debug,logger }) {
        const routeItems = require('../routes').get({ debug,logger })
        app.use(async(ctx, next) => {
            await next()
            if (ctx.status === 404) {
                await ctx.render('pug/404.pug')
            }
        })
        route.use(async(ctx, next) => {
            debug('route-before')
            await next()
            debug('route-after')
        }) 

        //默认访问路径
        route.get('/', async(ctx, next) => {
            await ctx.render('pug/index.pug')
        })
        _.each(routeItems, (routeItem) => { 
            route.use('/' + routeItem.name, routeItem.route.routes(), routeItem.route.allowedMethods())
        })
        app.use(route.routes(), route.allowedMethods())
        //end router
    }
}