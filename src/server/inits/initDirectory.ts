export default {
    init(app, { debug }) {
        const { ioHelper } = appUtils.requireCommon()
        const dir = APP_CONFIG.uploadPath
        //待初始化路径 
        let initDirs = [dir]
        for (let dir of initDirs) {
            const exists = ioHelper.exists(dir)
            if (!exists) {
                return ioHelper.makeDir(dir)
            }
            debug(`directory:${dir} OK.`)
        }
    }
}