import * as KoaRouter from 'koa-router'
import routers from '../../routers'
import sso from './sso'
/**
 * 注册路由
 */
export default async ({ debug, logger }) => {
  //根路由
  const router = new KoaRouter()
  const routerItems = await routers.get({ debug, logger })
  /**
   * 单点登陆权限相关
   */
  appUtils.isLogin() && !appUtils.isDev() && sso(router)  // 默认关闭

  //默认访问路径
  router.get('/', async (ctx, next) => {
    //跳转到入口页面
    // ctx.redirect('/index.html')
    await ctx.send('index.html')
    // await ctx.render('pug/index.pug')
  })
  routerItems.forEach((routerItem) => {
    router.use('/' + routerItem.name, routerItem.router.routes(), routerItem.router.allowedMethods())
  })
  return [
    async (ctx, next) => {
      ctx.getUserName = function () {
        return ctx.cookies.get('username') || ''
      }
      if (appUtils.isDev() || !appUtils.isLogin()) {
        return await next()
      }

      //权限验证相关
      const username = ctx.getUserName()
      if (ctx.method !== 'GET' || ctx.path.includes('.') || ['/login', '/logout'].includes(ctx.path) || username) {
        return await next()
      } else {
        ctx.originalUrl = '/login'
        ctx.url = '/login'
        await next()
      }
    },
    async (ctx, next) => {
      await next()
      if (ctx.status === 404) {
        ctx.status = 404
        await ctx.render('pug/404.pug')
      }
    },
    [router.routes(), router.allowedMethods()]
  ]
}
