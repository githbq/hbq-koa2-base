import * as bodyParser from 'koa-body'
import * as pathTool from 'path'
import * as momentHelper from 'moment-helper'
import * as rimraf from 'rimraf'
import ioHelper from 'io-helper'
export default () => {
    return [
        bodyParser({
            formLimit: 1024 * 1024 * 5,
            jsonLimit: 1024 * 1024 * 10,
            multipart: true,
            formidable: {
                maxFieldsSize: 1024 * 1024 * 100,
                uploadDir: APP_CONFIG.uploadPath,
                keepExtensions: true,
                multiples: true,
                onFileBegin: function (fieldName, file) {
                    //空文件 在下次事件轮询时删除
                    if (!file.size) {
                        file.name = 'emptyfile'
                        setImmediate(() => {
                            rimraf(ioHelper.pathTool.join(APP_CONFIG.uploadPath, '**/*emptyfile*'), (err) => { })
                        })
                    }
                    file.name = `${momentHelper.format(null, 'YYYYMMDDHHmmss-')}${file.name}`
                    const filePath = pathTool.join(pathTool.dirname(file.path), fieldName)
                    ioHelper.makeDirSync(filePath)
                    const fullPath = pathTool.join(filePath, file.name)
                    const relativePath = pathTool.relative(ROOT_PATH, fullPath)
                    //替换正斜杠为反斜，这样可以直接往数据库存
                    file.relativePath = ioHelper.replaceSep(relativePath)
                    file.path = fullPath
                }
            }
        })]
}