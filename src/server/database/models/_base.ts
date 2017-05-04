/** 
 * mogoose model 通用静态方法 ,子model会自动继承
 */ 
import * as mongoModelStatics from 'mongo-model-statics' 
export default {
    ...mongoModelStatics, 
    //   keyWord: '$',
    // /**
    //  * 查询条件处理
    //  * @param {条件对象} condition 
    //  */
    // _conditionProcess(condition) {
    //     const keys = Object.keys(condition)

    //     function getReg(regStr) {
    //         //忽略大小写搜索
    //         return new RegExp(regStr, 'i')
    //     }
    //     keys.forEach((n) => {
    //         const startWith = _.startsWith(n, this.keyWord)
    //         const endWith = _.endsWith(n, this.keyWord)
    //         const value = condition[n]
    //             //实际的key
    //         let newKey
    //             //正则串
    //         let regStr
    //             //正则对象
    //         let reg
    //             //key 匹配  $xxx$ 作包含判断
    //         if (startWith && endWith) {
    //             regStr = escapeStringRegexp(value)
    //             reg = getReg(`${regStr}`)
    //             newKey = n.substring(1, n.length - 1)
    //         }
    //         //key 匹配  $xxx  作开头判断
    //         else if (startWith) {
    //             regStr = escapeStringRegexp(value)
    //             reg = getReg(`^${regStr}`)
    //             newKey = n.substring(1)
    //         }
    //         //key 匹配  xxx$ 作结尾判断
    //         else if (endWith) {
    //             regStr = escapeStringRegexp(value)
    //             reg = getReg(`${regStr}$`)
    //             newKey = n.substring(0, n.length - 1)
    //         } else {
    //             newKey = n
    //         }
    //         delete condition[n] //删除旧的key
    //         condition[newKey] = regStr ? reg : value
    //     })
    //     return condition
    // },
    // /**
    //  * 参数预处理
    //  * @param {参数} param 
    //  */
    // _paramPreprocess(param) {
    //     param = param || {}
    //     if (param) {
    //         param.condition = param.condition || {}
    //     }
    //     //参数处理
    //     param.condition = this._conditionProcess(param.condition)
    //     return param
    // },
    // _getCount(param) {
    //     param = this._paramPreprocess(param)
    //     return this
    //         .count(param.condition)
    //         .exec()
    // },
    // /**
    //  * 分页方法 最小页标是1  默认页面大小是10
    //  * @param {*参数} param 
    //  * @param {*查询数据回调} callback 
    //  * @param {*查询数据条数回调} countcallback 
    //  */
    // _getPage(param, callback, countcallback) {
    //     param = this._paramPreprocess(param)
    //     param.pageIndex = parseInt(param.pageIndex || 1) //默认页是第1 页
    //     param.pageIndex = param.pageIndex < 1 ? 1 : param.pageIndex //最小页码是1
    //     param.pageSize = parseInt(param.pageSize || 10)
    //     param.pageSize = param.pageSize < 1 ? 1 : param.pageSize //最小大小是1
    //     let pagePromise = this
    //         .find(param.condition)
    //         .sort(param.sortBy || { createTime: -1 })
    //         .skip((param.pageIndex - 1) * param.pageSize)
    //         .limit(param.pageSize)
    //         .find()
    //     let countPromise = this
    //         .find(param.condition)
    //         .count()
    //     if (callback) {
    //         pagePromise = callback(pagePromise) || pagePromise
    //     }
    //     if (countcallback) {
    //         countPromise = countcallback(countPromise) || countPromise
    //     }
    //     countPromise = countPromise.exec()
    //     pagePromise = pagePromise.exec()
    //     return Q.all([countPromise, pagePromise]).spread((count, page) => { //两函数返回的两个值
    //         return { total: count, list: page, pageIndex: param.pageIndex, pageSize: param.pageSize }
    //     })
    // },
    // _find(param) {
    //     param = this._paramPreprocess(param)
    //     return this.find(param.condition).sort(param.sortBy || { createTime: -1 }).exec()
    // },
    // _findOne(param) {
    //     param = this._paramPreprocess(param)
    //     return this.findOne(param.condition).exec()
    // },
    // _findById(id) {
    //     param = this._paramPreprocess(param)
    //     return this.findById(id).exec()
    // },
    // _delete(param) {
    //     param = this._paramPreprocess(param)
    //     return this.remove(param.condition).exec()
    // },
    // _add(data) {
    //     data.createTime = (new Date()).getTime()
    //     data.updateTime = (new Date()).getTime()
    //     data.createTimeString = momentHelper.get(data.createTime)
    //     data.updateTimeString = momentHelper.get(data.updateTime)
    //     let model = new this(data)
    //     return model.save()
    // },
    // _update(condition, updateData, option) {
    //     let deferred = Q.defer()
    //     delete updateData.createTime
    //     delete updateData.createTimeString
    //     updateData.updateTime = (new Date()).getTime()
    //     updateData.updateTimeString = momentHelper.get(updateData.updateTime)
    //     this.update(condition, updateData, option || { multi: true }, (err, data) => {
    //         if (err) {
    //             deferred.reject(err)
    //         } else {
    //             deferred.resolve(data)
    //         }
    //     })
    //     return deferred.promise
    // }
}