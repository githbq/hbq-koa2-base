const { ioHelper } = appUtils.requireCommon()
const momentHelper = appUtils.requireCommon('momentHelper')
    //文件上传处理 从临时文件 移动到目标文件夹  文件名加时间字符串前缀
export let upload = (options) => {
    let defaultOptions = {
        uploadPath: global.APP_CONFIG.uploadPath,
        dest: '', //目标路径 相对于path,或者一个绝对路径
        onSave: null //每一个文件保存的时候 事件

    }
    options = Object.assign({}, defaultOptions, options)
    return async(ctx, next) => {
        let parts = ctx.request.files
        const now = new Date()
        const year = now.getFullYear()
        const month = now.getMonth() + 1
        const day = now.getDate()
            //获取要上传到的文件夹
        let dir = ioHelper.pathTool.isAbsolute(options.dest) ? options.dest : ioHelper.pathTool.join(options.uploadPath, `${year}-${month}-${day}`, options.dest)
        const exists = await ioHelper.exists(dir)
        if (!exists) {
            await ioHelper.makeDir(dir)
        }
        while (parts.length) {
            let part = parts.shift()
                //要放置的文件路径 
            const destFilePath = ioHelper.pathTool.resolve(dir, `${momentHelper.format(null,'YYYYMMDDHHmmss-')}` + part.name)
            await ioHelper.moveAsync(part.path, destFilePath)
            options.onSave && options.onSave(destFilePath, ctx)
        }
        await next()
    }
}