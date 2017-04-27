 const ioHelper = appUtils.requireCommon('ioHelper')
 export default (route) => {
     route.noController = true; 
     route.get('/a', async(ctx, next) => {
         let content = '---'
         ctx.session.aaa = '312231231'
         ctx.state = {
             title: 'koa2 111',
             data: JSON.stringify(content)
         }
         await ctx.render('pug/tests.pug')
     })
     route.get('/data', async(ctx, next) => {
         ctx.body = global.JSONResponse(1, { a: 1, b: 2, c: 3 }, '成功')
     })
     route.get('/c', async(ctx, next) => {
         await ctx.send(ctx, 'index.html', { root: 'public/html' })
     })
     route.get('/file', async(ctx) => {
         ctx.body = await ioHelper.readFileStream(ioHelper.pathTool.join(ROOT_PATH, 'upload', '1.mp3'))
     })
     const { createSendRoute } = require('../helper/send')
     createSendRoute(route, '/send1', ['upload', '1.jpg'])
     createSendRoute(route, '/send2', ['upload', '1.mp3'])
 }