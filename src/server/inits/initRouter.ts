import * as koaRouter from 'koa-router'
import routes from '../routes'
//根路由
const route = koaRouter()
export default {
    init(app, { debug, logger }) {
        const routeItems = routes.get({ debug, logger })
        app.use(async (ctx, next) => {
            await next()
            if (ctx.status === 404) {
                await ctx.render('pug/404.pug')
            }
        })
        //默认访问路径
        route.get('/', async (ctx, next) => {
            await ctx.render('pug/index.pug')
        })
        route.get('/abc', async (ctx, next) => {
            ctx.body = { a: 11, b: 22, c: 33 }
        })
        _.each(routeItems, (routeItem) => {
            route.use('/' + routeItem.name, routeItem.route.routes(), routeItem.route.allowedMethods())
        })
        app.use(route.routes(), route.allowedMethods())
        //end router
    }
}