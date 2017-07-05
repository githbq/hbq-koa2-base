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
                    // Empty files are deleted when the next event is polled
                    if (!file.name) {
                        file.name = 'emptyfile'
                        file.disable = true
                        setImmediate(() => {
                            rimraf(ioHelper.pathTool.join(APP_CONFIG.uploadPath, '**/*emptyfile*'), (err) => { })
                        })
                    }
                    file.name = `${momentHelper.format(null, 'YYYYMMDDHHmmss-')}${file.name}`
                    const filePath = pathTool.join(pathTool.dirname(file.path), fieldName)
                    ioHelper.makeDirSync(filePath)
                    const fullPath = pathTool.join(filePath, file.name)
                    const relativePath = pathTool.relative(ROOT_PATH, fullPath)
                    // Replace the forward slash for backlash, so that you can go directly to the data inventory
                    file.relativePath = ioHelper.replaceSep(relativePath)
                    file.path = fullPath
                }
            }
        })]
}