//mongodb操作库
import mongoose from 'mongoose';
import Promise from 'bluebird';
//需要执行的初始化任务
export default {
    //执行初始化
    run({ debug }) {
        return { DB: this.DB({ debug }), APP_CACHE: this.APP_CACHE({ debug }) };
    },
    DB({ debug }) {
        //初始化数据库 
        mongoose.Promise = Promise;
        mongoose.connect(global.APP_CONFIG.mongodb, {
            server: {
                poolSize: 12,
                socketOptions: {
                    keepAlive: 1
                }
            }
        });
        const DB = { mongoose, ...require('../database').init({ debug }) };
        return DB;
        //end 初始化数据库
    },
    APP_CACHE({ debug }) {
        //mongo缓存库
        const CachemanMongo = global.appUtils.requireLib('cacheman-mongo');
        //应用程序缓存对象  支持异步操作
        const cache = new CachemanMongo(APP_CONFIG.mongodb, { collection: APP_CONFIG.projectName + 'Cache' });
        Promise.promisifyAll(cache);
        return cache;
    }
};