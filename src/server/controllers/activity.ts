/**
 * 活动
 */
import * as rimraf from 'rimraf'
const { momentHelper, ioHelper, ftpHelper } = appUtils.requireCommon()
export default ({ debug, logger }) => {
    const model = DB.models.activity
    const actions = {
        async uploadUploadFiles() {
            return await ftpHelper.uploadUploadFiles()
        },
        async uploaDistFiles() {
            return await ftpHelper.uploaDistFiles()
        },
        /**
         * 清空临时数据
         */
        async clearTempData(condition?: any) {
            let tempData = await model._find({ condition: { isTemp: true, ...condition } })
            logger.info(`tempData count:${tempData.length}`)
            appUtils.log(`tempData count:${tempData.length}`)
            //删除与这条临时数据相关的文件
            for (let data of tempData) {
                /**
                 * 删除与id相关的文件
                 */
                await new Promise(resolve => {
                    rimraf(ioHelper.pathTool.join(APP_CONFIG.uploadPath, `**/*${data._id}*`), (err) => {
                        resolve()
                    })
                })
                /**
                * 删除与id相关的文件
                */
                await new Promise(resolve => {
                    rimraf(ioHelper.pathTool.join(APP_CONFIG.staticPath, `**/*${data._id}*`), (err) => {
                        resolve()
                    })
                })
            }
            // for (let data of tempData) {
            //     data.pages = data.pages || []
            //     for (let page of data.pages) {
            //         page.components = page.components || []
            //         for (let component of page.components) {
            //             switch (component.type) {
            //                 case 'img': {
            //                     if (component.content && await ioHelper.exists([ROOT_PATH, component.content]).catch((e) => { appUtils.log(e.message) })) {
            //                         await ioHelper.delete([ROOT_PATH, component.content]).catch((e) => { appUtils.log(e.message) })
            //                     }
            //                 } break
            //             }
            //         }
            //     }
            // }
            return model._delete({ condition: condition || { isTemp: true } })
        },
        /**
         * 计划任务 根据生效时间刷新状态
         */
        async refreshEffactState() {
            //找出状态为未发布0或者已发布1的   
            let now = Date.now()
            //在时间区间内的改为已发布 1
            await model._update({ isTemp: false, state: 0, effactEndTime: { $ne: null, $gt: now }, effactStartTime: { $ne: null, $lte: now } }, { state: 1 })
            //超出时间的 改为下架 -1
            await model._update({ isTemp: false, state: 1, effactEndTime: { $ne: null, $lte: now } }, { state: -1 })
        },
        async preview(params, query, fields) {
            //标记为临时数据
            fields.isTemp = true
            return await actions.add.call(this, params, query, fields)
        },
        async add(params, query, fields) {
            delete fields._id
            actions.effectTimeLogic(fields)
            fields.createUser = this.getUserName()
            fields.updateUser = this.getUserName()
            const result = await model._add(fields)
            if (!fields.isTemp) {
                let { data: { src: previewHtmlPath } } = await actions.createStatePreviewHtml({ _id: result._id })
                return JSONResponse(1, result, '', { previewHtmlPath })
            }
            return JSONResponse(1, result)
        },
        async delete(params, query, fields) {
            const result = await model._delete({ condition: params })
            return JSONResponse(1, result)
        },
        /**
         * 生效时间逻辑
         * @param fields 
         */
        effectTimeLogic(fields) {
            let now = Date.now()
            if (fields.effactStartTime && fields.effactEndTime) {
                fields.effactStartTimeString = momentHelper.get(fields.effactStartTime)
                fields.effactEndTimeString = momentHelper.get(fields.effactEndTime)
                if (fields.effactStartTime <= now && fields.effactEndTime > now) {
                    fields.state = 1
                }
                if (fields.effactEndTime <= now) {
                    fields.state = -1
                }
            }
        },
        /** */
        async createStatePreviewHtml({ _id }) {
            /**
             * 如果存在模板页面文件
             */
            let previewHtmlPath = [APP_CONFIG.staticPath, 'views', 'index_view.html']
            let activity = await model._findById(_id)
            if (!activity) {
                return JSONResponse(0, null, `查无此数据 _id:${_id}`)
            }
            activity = activity.toObject()
            if (await ioHelper.exists(previewHtmlPath)) {
                let previewHtmlStr = await ioHelper.readFile(previewHtmlPath)
                previewHtmlStr = previewHtmlStr.replace(`<!--activeData-->`,
                    [
                        `<!--activeDataFilled-->\n`,
                        '<script>\n',
                        `window.__initData__=${JSON.stringify(activity)}\n`,
                        `</script>`
                    ].join(''))
                    .replace('v=version', `v=${Date.now()}`)
                let newHtmlPath = previewHtmlPath.slice(0, 2).concat(`index_view-generate-${_id}.html`)
                await ioHelper.writeFile(newHtmlPath, previewHtmlStr)
                newHtmlPath = ioHelper.processDir(newHtmlPath)
                newHtmlPath = ioHelper.pathTool.relative(APP_CONFIG.staticPath, newHtmlPath)
                newHtmlPath = ioHelper.replaceSep(newHtmlPath)
                return JSONResponse(1, { src: newHtmlPath }, `生成新预览文件 filePath:${newHtmlPath}`)
            }
            return JSONResponse(0, null, `未找到预览文件 filePath:${ioHelper.replaceSep(ioHelper.processDir(previewHtmlPath))}`)
        },
        async update(params, query, fields) {
            actions.effectTimeLogic(fields)
            fields.updateUser = this.getUserName()
            const result = await model._update(params, fields, { upsert: true })
            let { data: { src: previewHtmlPath } } = await actions.createStatePreviewHtml(params)
            return JSONResponse(1, result, '', { previewHtmlPath })
        },
        async getPage(params, query, fields) {
            const result = await model._getPage({ condition: query, ...params })
            return JSONResponse(1, result)
        },
        async getById({ _id }) {
            const result = await model._findById(_id)
            return JSONResponse(1, result)
        },
        async insert() {
            const result = await model._add({
                /**
                 * 业务线
                 */
                tradeLine: '业务线',
                /**
                 * 活动类型 
                 */
                type: 1,
                /**
                 * 状态
                 */
                state: 1,
                /**
                 * 线上地址
                 */
                address: 'http://58.com',
                /**
                 * 活动名称
                 */
                name: '活动名称1',
                /**
                 * 页码形式
                 */
                pageNumber: '页面形式',
                /**
                 * 背景音乐
                 */
                music: '背景音乐',
                /**
                 * 翻页效果
                 */
                pageTurning: '翻页效果',
                /**
                 * 音乐播放形式
                 */
                musicPlayMode: '播放形式',
                /**
                 * 推广开始时间  时间戳 new Date(date).getTime() 
                 */
                effactStartTime: new Date().getTime(),
                /**
                 *  推广开始 时间格式化字符串 'YYYY-MM-DD HH:mm:ss'
                 */
                effactStartTimeString: momentHelper.format(null, momentHelper.formatType.normal),
                /**
                 * 推广结束时间  时间戳 new Date(date).getTime() 
                 */
                effactEndTime: new Date().getTime(),
                /**
                 *  推广结束 时间格式化字符串 'YYYY-MM-DD HH:mm:ss'
                 */
                effactEndTimeString: momentHelper.format(null, momentHelper.formatType.normal),
                /**
                 * 允许调起
                 */
                awake: true,
                share: {
                    img: 'http://i3.mifile.cn/a4/xmad_14890540335855_wTxbY.jpg',
                    title: 'xiaomi',
                    desc: '描述',
                    required: false
                }
            }, )
            return JSONResponse(1, result)
        }
    }
    return actions
}