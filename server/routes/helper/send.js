 //创建直接访问文件的路由
 export let createSendRoute = (router, action, routeUrl, fileName, rootPath, callback) => {
     router[action](routeUrl, async(ctx, next) => {
         // await ctx.send(ctx, 'index.html', { root: 'public/ueditor' });
         await ctx.send(ctx, fileName, { root: rootPath });
         callback && callback(null, ctx, next);
     });
 };