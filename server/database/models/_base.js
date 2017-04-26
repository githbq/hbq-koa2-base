/** 
 * 子model会自动继承无需手动
 */
const momentHelper = appUtils.requireCommon('momentHelper');
export default {
    c_getCount(param) {
        return this
            .count(param.condition)
            .exec();
    },
    c_getPage(param, callback, countcallback) {
        param.pageIndex = parseInt(param.pageIndex || 1); //默认页是第1 页
        param.pageSize = parseInt(param.pageSize || 10);
        let pagePromise = this
            .find(param.condition)
            .sort(param.sortBy || { createTime: -1 })
            .skip((param.pageIndex - 1) * param.pageSize)
            .limit(parseInt(param.pageSize))
            .find();
        let countPromise = this
            .find(param.condition)
            .count();
        if (callback) {
            pagePromise = callback(pagePromise) || pagePromise;
        }
        if (countcallback) {
            countPromise = countcallback(countPromise) || countPromise;
        }
        countPromise = countPromise.exec();
        pagePromise = pagePromise.exec();
        return Q.all([countPromise, pagePromise]).spread((count, page) => { //两函数返回的两个值
            return { total: count, list: page, pageIndex: param.pageIndex, pageSize: param.pageSize }
        });
    },
    c_find(param) {
        return this.find(param.condition).sort(param.sortBy || { createTime: -1 }).exec();
    },
    c_findOne(param) {
        return this.findOne(param.condition).exec();
    },
    c_findById(id) {
        return this.findById(id).exec();
    },
    c_delete(param) {
        return this.remove(param.condition).exec();
    },
    c_add(data) {
        data.createTime = (new Date()).getTime();
        data.updateTime = (new Date()).getTime();
        data.createTimeString = momentHelper.get(data.createTime);
        data.updateTimeString = momentHelper.get(data.updateTime);
        let model = new this(data);
        return model.save();
    },
    c_update(condition, updateData, option) {
        let deferred = Q.defer();
        delete updateData.createTime;
        delete updateData.createTimeString;
        updateData.updateTime = (new Date()).getTime();
        updateData.updateTimeString = momentHelper.get(updateData.updateTime);
        this.update(condition, updateData, option || { multi: true }, (err, data) => {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(data);
            }
        });
        return deferred.promise;
    }
};