// Mongodb operating library
import * as mongoose from 'mongoose'
import * as Promise from 'bluebird'
import * as log4js from 'koa-log4'
import database from '../database'
import CachemanMongo from 'cacheman-mongo2'
// Need to perform initialization tasks
export default {
    // Execute initialization
    async run({ debug }) {
        return { LOGGER: await this.LOGGER({ debug }), DB: await this.DB({ debug }), APP_CACHE: await this.APP_CACHE({ debug }) }
    },
    async DB({ debug }) {
        // Initialize the database
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
        // End initializes the database
    },
    async APP_CACHE({ debug }) {
        // Mongo cache
        // The application cache object supports asynchronous operation
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
            // ReloadSecs: 300
        })
        return log4js.getLogger('log_date')
    }
}