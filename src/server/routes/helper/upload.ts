const { ioHelper, momentHelper } = appUtils.requireCommon()
// File upload processing from temporary file to target folder file name plus time string prefix
export let upload = (options) => {
    let defaultOptions = {
        uploadPath: APP_CONFIG.uploadPath,
        dest: momentHelper.format(null, 'YYYY-MM-DD'), // The target path is relative to uploadPath
        onSave: null // Every file is saved when the event
    }
    options = Object.assign({}, defaultOptions, options)
    return async (ctx, next) => {
        let parts = ctx.request.body.files
        // Gets the folder to upload to
        let dir = ioHelper.pathTool.isAbsolute(options.dest) ? options.dest : ioHelper.pathTool.join(options.uploadPath, options.dest)
        const exists = await ioHelper.exists(dir)
        if (!exists) {
            await ioHelper.makeDir(dir)
        }
        while (parts.length) {
            let part = parts.shift()
            // The path to the file to be placed
            const destFilePath = ioHelper.pathTool.resolve(dir, `${momentHelper.format(null, 'YYYYMMDDHHmmss-')}` + part.name)
            await ioHelper.moveAsync(part.path, destFilePath)
            options.onSave && options.onSave(destFilePath, ctx)
        }
        await next()
    }
}