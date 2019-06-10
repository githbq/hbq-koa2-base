export default {
    async init(app, { debug }) {
        const { ioHelper } = appUtils.requireCommon()
        const dir = APP_CONFIG.uploadPath
        //待初始化路径 
        let initDirs = [dir]
        for (let dir of initDirs) {
            const exists = await ioHelper.exists(dir)
            if (!exists) {
                return await ioHelper.makeDir(dir)
            }
            debug(`directory:${dir} OK.`)
        }
    }
}