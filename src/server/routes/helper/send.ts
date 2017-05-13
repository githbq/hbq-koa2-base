import * as pathTool from 'path'
/**
 * pathName 可以是一个路径或者是一个路径的数组会自动path.join
  usage:
   const { createSendRoute } = require('../helper/send')
   createSendRoute(route, '/send1', ['upload', '1.jpg'])
   如果是需要做附件下载 添加中间件 写法：
   const { createSendRoute } = require('../helper/send')
    createSendRoute(route, '/send1', ['upload', '1.jpg'],(ctx)=>{createSendRoute(ctx.attachment(文件名:abc.xxx)})
     
 */
export let createSendRoute = (router, routeUrl, pathName, ...nextMiddleWares) => {
    router.get(routeUrl, async (ctx, next) => {
        pathName = pathTool.join.apply(null, [].concat(pathName))
        const rootPath = pathTool.isAbsolute(pathName) ? '' : ROOT_PATH
        await ctx.send(ctx, pathName, { root: rootPath })
        nextMiddleWares.length > 0 && await next()
    }, ...nextMiddleWares)
}