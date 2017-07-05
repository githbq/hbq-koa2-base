export default {
    async init(app, { debug }) {
        const { ioHelper } = appUtils.requireCommon()
        const dir = APP_CONFIG.uploadPath
        // The path to be initialized
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