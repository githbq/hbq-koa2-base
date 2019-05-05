//mongodb操作库
import * as mongoose from 'mongoose'
import * as BPromise from 'bluebird'
import * as log4js from 'koa-log4'
import database from '../database'
import CachemanMongo from 'cacheman-mongo2'

//需要执行的初始化任务
export default {
    //执行初始化
    async run({ debug }) {
        const self = this
        return {
            LOGGER: await this.LOGGER({ debug }),
            ...(APP_CONFIG.useMongodb ?
                {
                    DB: await self.DB({ debug }),
                    APP_CACHE: await self.APP_CACHE({ debug })
                } :
                { 
                    DB: null,
                     APP_CACHE : null 
                    }) 
        }
    },
    async DB({ debug }) {
        //初始化数据库 
        mongoose.Promise = BPromise
        await new Promise((resolve, reject) => {
            mongoose.connect(APP_CONFIG.mongodb, {
                promiseLibrary: global.Promise,
                useMongoClient: true,
                server: {
                    poolSize: 12,
                    socketOptions: {
                        keepAlive: 1
                    }
                }
            }, (err) => {
                if (err) {
                    reject(err)
                } else {
                    resolve('ok')
                }
            })
        })
        const DB = { mongoose, ...(await database.init({ debug })) }
        return DB
        //end 初始化数据库
    },
    async APP_CACHE({ debug }) {
        //mongo缓存库 
        //APP_CACHE 对象拥有以下promise方法 
        //应用程序缓存对象  支持异步promise操作 .getAsync(key) 取值  .setAsync(key,value)赋值  .delAsync(key)删除键  .clearAsync清空所有缓存
        const cache = new CachemanMongo(
            APP_CONFIG.mongodb,
            {
                collection: 'appCaches'
            }
        )
        await new Promise((resolve, reject) => {
            cache.ready((err) => {
                if (err) {
                    reject(err)
                } else {
                    resolve('ok')
                }
            })
        })
        //将get set del clear 方法promise化，对应方法名增加`Async`后缀
        BPromise.promisifyAll(cache)
        //默认有效期设为24小时
        cache.setAsync = function (key, value, seconds = (60 * 60 * 24)) {
            return new BPromise((resolve, reject) => {
                cache.set(key, value, seconds, function (err) {
                    if (err) {
                        reject(err)
                    } else {
                        resolve()
                    }
                })
            })
        }
        return cache
    },
    async LOGGER() {
        log4js.configure(appUtils.requireCommon('configs', 'log4js'), {
            // reloadSecs: 300
        })
        return log4js.getLogger('log_date')
    }
}