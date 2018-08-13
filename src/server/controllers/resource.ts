/**
 * 活动
 */
import * as  pathTool from 'path'
// import * as  gulp from 'gulp'
// import * as imagemin from 'gulp-imagemin'
// import * as  rename from 'gulp-rename'
// import * as pngquant from 'imagemin-pngquant'
// import * as  imageminJpegRecompress from 'imagemin-jpeg-recompress'

// import * as fs from 'fs-extra-promise'

// import * as  sizeOf from 'image-size'

const { momentHelper, ioHelper } = appUtils.requireCommon()
const fileRegexp = /\.(jpg|png|gif)$/
//压缩文件
export async function minImg(files) {
    // //做压缩处理
    // let promises = []
    // for (let file of files) {
    //     if (fileRegexp.test(pathTool.extname(file.path))) {
    //         let extName = pathTool.extname(file.path)
    //         let dirName = pathTool.dirname(file.path)
    //         let minName = file.name.replace(extName, `-min${extName}`)
    //         promises.push(new Promise(resolve => {
    //             gulp.src(file.path)
    //                 .pipe(imagemin([
    //                     imagemin.gifsicle({ interlaced: true }),
    //                     imagemin.jpegtran({ progressive: true }),
    //                     imagemin.optipng({ optimizationLevel: 5 }),
    //                     imagemin.svgo({ plugins: [{ removeViewBox: false }] }),
    //                     pngquant({ quality: '65-80' }),
    //                     imageminJpegRecompress()
    //                 ]))
    //                 .pipe(rename(minName))
    //                 .pipe(gulp.dest(dirName))
    //                 .on('end', () => {
    //                     //完成后将压缩后的路径赋值file上
    //                     file.minSrc = file.relativePath.replace(file.name, minName)
    //                     resolve()
    //                 })
    //         }))
    //     }
    // }
    // await Promise.all(promises)
}
export default ({ debug, logger }) => {
    // const model = DB.models.resource
    // return {
    //     /**
    //      * 添加资源  传入表单数据 noSave=1 说明这个文件是不需要保存到数据库的
    //      * @param fields 表单数据
    //      * @param fileFields 文件数据
    //      */
    //     async add(fields, fileFields) {
    //         delete fields._id
    //         fields.state = 0
    //         fileFields.attachment = [].concat(fileFields.attachment).filter((f) => !f.disable)
    //         //传1过来代码压缩
    //         fields.min === '1' && await minImg(fileFields.attachment)
    //         const results = []
    //         for (let file of fileFields.attachment) {
    //             if (file.minSrc) {
    //                 file.minSize = Math.ceil((await fs.statAsync(file.minSrc)).size / 1024)
    //             }
    //             if (fields.data_id) {//如果有传id字段过来  以这个id为目录名
    //                 let dirname = pathTool.dirname(file.relativePath)//目录名  
    //                 let filename = pathTool.basename(file.relativePath)//文件全名 aaa.txt
    //                 let newDirname = pathTool.join(dirname, fields.data_id)
    //                 await ioHelper.move(file.relativePath, newDirname)
    //                 file.relativePath = pathTool.join(newDirname, filename)
    //             }
    //             /**
    //              * 尺寸信息
    //              */
    //             let dimensions = {}
    //             if (fileRegexp.test(file.relativePath)) {
    //                 dimensions = await new Promise((resolve, reject) => {
    //                     sizeOf(file.relativePath, (err, dimensions) => {
    //                         if (err) {
    //                             debug(err)
    //                             resolve(null)
    //                         } else {
    //                             resolve(dimensions)
    //                         }
    //                     })
    //                 })
    //             }
    //             let fileData: any = { name: file.name, size: Math.ceil(file.size / 1024), minSrc: file.minSrc, minSize: file.minSize, src: file.relativePath, dimensions }
    //             if (!fields.noSave) {
    //                 fileData.createUser = this.getUserName()
    //                 fileData.updateUser = this.getUserName()
    //                 fileData = await model._add(fileData)
    //             }
    //             results.push(fileData)
    //         }
    //         return JSONResponse(1, results, '保存成功')
    //     },
    //     async delete(params) {
    //         const result = await model._delete({ condition: params })
    //         return JSONResponse(1, result)
    //     },
    //     async update(params, query, fields) {
    //         const result = await model._update(params, fields)
    //         return JSONResponse(1, result)
    //     },
    //     async getPage(params, query) {
    //         const result = await model._getPage({ condition: query, ...params })
    //         return JSONResponse(1, result)
    //     },
    //     async getById({ _id }) {
    //         const result = await model._findById(_id)
    //         return JSONResponse(1, result)
    //     }
    // }
}