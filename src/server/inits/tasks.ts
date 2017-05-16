//mongodb操作库
import * as mongoose from 'mongoose'
import * as Promise from 'bluebird'
import * as log4js from 'koa-log4'
import database from '../database'
import CachemanMongo from 'cacheman-mongo2'
//需要执行的初始化任务
export default {
    //执行初始化
    async run({ debug }) {
        return { LOGGER: await this.LOGGER({ debug }), DB: await this.DB({ debug }), APP_CACHE: await this.APP_CACHE({ debug }) }
    },
    async DB({ debug }) {
        //初始化数据库 
        mongoose.Promise = Promise
        await new Promise((resolve, reject) => {
            mongoose.connect(APP_CONFIG.mongodb, {
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
        //应用程序缓存对象  支持异步操作
        const cache = new CachemanMongo(APP_CONFIG.mongodb, { collection: APP_CONFIG.projectName + 'Cache' })
        await new Promise((resolve, reject) => {
            cache.ready((err) => {
                if (err) {
                    reject(err)
                } else {
                    resolve('ok')
                }
            })
        })
        Promise.promisifyAll(cache)
        return cache
    },
    async LOGGER() {
        log4js.configure(appUtils.requireCommon('configs', 'log4js'), {
            // reloadSecs: 300
        })
        return log4js.getLogger('log_date')
    }
}