import * as FtpHelper from 'ftp-helper'
import ioHelper from './ioHelper'
let { pathTool } = ioHelper
function getPrefix() {
    let prefix = appUtils.isDev() ? '/' : '/' 
    return prefix
}
/**
 * ftp操作辅助
 */
export default {
    FtpHelper,
    async uploaDistFiles() {
        return await this.uploadFiles(getPrefix(), APP_CONFIG.staticPath)
    },
    async uploadUploadFiles() {
        return await this.uploadFiles(getPrefix(), APP_CONFIG.uploadPath, {
            onGetRelativePath(path) {
                return ioHelper.join(pathTool.basename(APP_CONFIG.uploadPath), path)
            }
        })
    },
    async uploadFiles(prefix, cwd, options = { onGetRelativePath: null }) {
        const ftp = new FtpHelper(APP_CONFIG.staticFtp, { prefix, isShowLog: false, isOnce: false })
        await ftp.getConnection()//主动连接
        //得到的是相对路径
        let paths = await ioHelper.globby(['**/*.*'], { cwd: cwd, nodir: true })
        appUtils.log(`共找到${paths.length}个文件`)

        let pathData = paths.map((path) => {
            let relativePath = options.onGetRelativePath ? options.onGetRelativePath(path) : path
            appUtils.log('ioHelper.resolve(path)', pathTool.resolve(relativePath))
            appUtils.log('relativePath', relativePath)
            return { localPath: ioHelper.resolve(cwd, path), remotePath: relativePath }
        })
        let count = 0
        await Promise.map(pathData, ({ localPath, remotePath }, i) => {
            appUtils.log(`正在上传第${i}个文件 path:${localPath}`)
            return ftp.upload(localPath, remotePath).then(() => {
                count++
                appUtils.log(`剩余:${paths.length - count}个文件`)
            }).catch((e) => {
                count++
                appUtils.error(e.message)
            })
        }, { concurrency: 5 })

        appUtils.log(`所有文件上传结束`)
        await ftp.closeConnection()
        return { count: paths.length, files: paths }
    }
}