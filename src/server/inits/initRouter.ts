import * as koaRouter from 'koa-router'
import routes from '../routes'
// Root route
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
        // Default access path
        route.get('/', async (ctx, next) => {
            await ctx.render('pug/index.pug')
        })
        routeItems.forEach((routeItem) => {
            route.use('/' + routeItem.name, routeItem.route.routes(), routeItem.route.allowedMethods())
        })
        app.use(route.routes(), route.allowedMethods())
        appUtils.log("App routes:");
        appUtils.log(route.stack.map(i => i.path));
        // End router
    }
}