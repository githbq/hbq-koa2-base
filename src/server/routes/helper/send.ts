import * as pathTool from 'path'
/**
 * PathName can be a path or an array of paths will automatically path.join
  usage:
   const { createSendRoute } = require('../helper/send')
   createSendRoute(route, '/send1', ['upload', '1.jpg'])
   If it is necessary to do attachment download add middleware wording:
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