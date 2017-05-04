const ioHelper = appUtils.requireCommon('ioHelper')
export default (route, { controller }) => {
    route.get('/', async (ctx, next) => {
        ctx.body = JSONResponse(1, { a: 1, b: 2, c: 3 }, '成功')
    })
    route.get('/c', async (ctx, next) => {
        await ctx.send(ctx, 'index.html', { root: 'public/html' })
    })
    route.get('/file', async (ctx) => {
        ctx.body = await ioHelper.readFileStream(ioHelper.pathTool.join(ROOT_PATH, 'upload', '1.mp3'))
    })
    const { createSendRoute } = require('../helper/send')
    createSendRoute(route, '/send1', ['upload', '1.jpg'])
    createSendRoute(route, '/send2', ['upload', '1.mp3'])
}