/**
 * 活动
 */
const { momentHelper } = appUtils.requireCommon();
export default ({ debug, logger }) => {
    const model = DB.models.activity
    return {
        async add(ctx, next) {
            const result = await model._add(ctx.request.fields)
            ctx.body = JSONResponse(1, result)
        },
        async delete(ctx, next) {
            const result = await model._delete({ condition: ctx.params })
            ctx.body = JSONResponse(1, result)
        },
        async update(ctx, next) {
            const result = await model._update(ctx.params, ctx.request.fields)
            ctx.body = JSONResponse(1, result)
        },
        async getPage(ctx, next) {
            const result = await model._getPage({ condition: ctx.query, ...ctx.params })
            ctx.body = JSONResponse(1, result)
        },
        async getById(ctx, next) {
            const result = await model._findById(ctx.request.params._id)
            ctx.body = JSONResponse(1, result)
        },
        async insert(ctx, next) {
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
                    coverSrc: 'http://i3.mifile.cn/a4/xmad_14890540335855_wTxbY.jpg',
                    title: 'xiaomi',
                    desc: '描述',
                    required: false
                }
            }, )
            ctx.body = JSONResponse(1, result)
        }
    }
}