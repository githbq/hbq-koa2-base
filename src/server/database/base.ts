/** 
 * Mogoose model Universal static method, sub model will automatically inherit
 */
import mongoModelStatics from 'mongo-model-statics'
export default {
    ...mongoModelStatics,
    // keyWord: '$',
    // /**
    //  * Query condition processing
    //  * @param {conditional object} condition
    //  */
    // _conditionProcess(condition) {
    //     const keys = Object.keys(condition)

    //     function getReg(regStr) {
    //         // ignore case search
    //         return new RegExp(regStr, 'i')
    //     }
    //     keys.forEach((n) => {
    //         const startWith = n.startsWith(n, this.keyWord)
    //         const endWith = n.endsWith(n, this.keyWord)
    //         const value = condition[n]
    // // the actual key
    // Let newKey
    // // regular string
    // Let regStr
    // // regular objects
    // Let reg
    // // key matches $ xxx $ for containing judgment
    //         if (startWith && endWith) {
    //             regStr = escapeStringRegexp(value)
    //             reg = getReg(`${regStr}`)
    //             newKey = n.substring(1, n.length - 1)
    //         }
    //         // key matches $ xxx for the first judgment
    //         else if (startWith) {
    //             regStr = escapeStringRegexp(value)
    //             reg = getReg(`^${regStr}`)
    //             newKey = n.substring(1)
    //         }
    //         // key matches xxx $ for ending judgment
    //         else if (endWith) {
    //             regStr = escapeStringRegexp(value)
    //             reg = getReg(`${regStr}$`)
    //             newKey = n.substring(0, n.length - 1)
    //         } else {
    //             newKey = n
    //         }
    //         delete condition[n] // delete old key
    //         condition[newKey] = regStr ? reg : value
    //     })
    //     return condition
    // },
    // /**
    //  * Parameter preprocessing
    //  * @param {parameter} param
    //  */
    // _paramPreprocess(param) {
    //     param = param || {}
    //     if (param) {
    //         param.condition = param.condition || {}
    //     }
    //     // parameter handling
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
    //  * Paging method the smallest page is 1 The default page size is 10
    //  * @param {*parameters} param
    //  * @param {*query data callback} callback
    //  * @param {*query the number of data callback} countcallback
    //  */
    // _getPage(param, callback, countcallback) {
    //     param = this._paramPreprocess(param)
    //     param.pageIndex = parseInt(param.pageIndex || 1) // default page is page 1
    //     param.pageIndex = param.pageIndex < 1 ? 1 : param.pageIndex // minimum page number is 1
    //     param.pageSize = parseInt(param.pageSize || 10)
    //     param.pageSize = param.pageSize < 1 ? 1 : param.pageSize // minimum size is 1
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
    //     return Promise.all([countPromise, pagePromise]).then(([count, page]) => { //  fonction retourne deux valeurs deux
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
    //     return this.findById(id).exec()
    // },
    // _delete(param) {
    //     param = this._paramPreprocess(param)
    //     return this.remove(param.condition).exec()
    // },
    // _add(data) {
    //     let model = new this(data)
    //     return model.save()
    // },
    // _update(condition, updateData, option) {
    //     return new Promise((resolve, reject) => {
    //         this.update(condition, updateData, option || { multi: true }, (err, data) => {
    //             if (err) {
    //                 reject(err)
    //             } else {
    //                 resolve(data)
    //             }
    //         })
    //     })
    // }
}