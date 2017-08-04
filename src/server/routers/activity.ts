/**
 * 活动
 */
export default (router, { controller }) => {
    const { ftpHelper } = appUtils.requireCommon()
    //上传upload文件
    router.get('/ftpupload/upload', controller.bindAction('uploadUploadFiles'))
    //上传前端dist文件
    router.get('/ftpupload/dist', controller.bindAction('uploaDistFiles'))
    //页面
    router.get('/', async (ctx, next) => {
        await ctx.render('pug/activity.pug', { title: 'activity' })
    })
    router.get('/clear', controller.bindAction('clearTempData'))
    router.get('/insert', controller.bindAction('insert'))
    router.get('/preview/create/:_id', controller.bindAction('createStatePreviewHtml'))
    router.post('/preview', controller.bindAction('preview'))
    router.post('/', controller.bindAction('add'))
    router.delete('/:_id', controller.bindAction('delete'))
    router.put('/:_id', controller.bindAction('update'))
    router.get('/page/:pageSize/:pageIndex', controller.bindAction('getPage'))
    router.get('/:_id', controller.bindAction('getById'))
} 