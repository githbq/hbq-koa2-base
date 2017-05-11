 import * as pathTool from 'path'
 /**
  * fileName 可以是一个路径或者是一个路径的数组会自动path.join
   usage:
    const { createSendRoute } = require('../helper/send')
    createSendRoute(route, '/send1', ['upload', '1.jpg'])
  */
 export let createSendRoute = (router, routeUrl, fileName, nextMiddleWare) => {
     router.get(routeUrl, async(ctx, next) => {
         await ctx.send(ctx, pathTool.join.apply(null, [].concat(fileName)), { root: ROOT_PATH })
     }, nextMiddleWare ? nextMiddleWare : () => {})
 }