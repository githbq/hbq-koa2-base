import * as pathTool from 'path'
import * as _ from 'lodash'
import * as Promise from 'bluebird'
//异步库
import * as Q from 'q'
//应用程序工具库
import appUtils from '../appUtils'
//需要执行的初始化任务 比如数据库 缓存库
import tasks from './tasks'
/**
 * global文件会在应用程序最开始被执行  优先执行
 */ 
export default {
    init({ debug }) {
        //向global添加全局对象
        Object.assign(global, {
            //程序根目录
            ROOT_PATH: process.cwd(),
            //运行模式 开发模式还是其他 默认不传则为开发模式  development开发环境状态  production生产环境状态 test测试环境模式
            NODE_ENV: process.env.NODE_ENV || 'development',
            //配置模式 默认直接读common/configs/appConfig  如果配置了则增加一个文件夹路径   common/configs/${CONFIG_MODE}/appConfig 
            CONFIG_MODE: process.env.CONFIG_MODE || '',
            //全局promise重新定义为bluebird
            Promise,
            //鲁大师 对象或集合操作辅助库
            _,
            //异步处理promise库的另一种选择 方便代码量大的时候 写promise更美观
            Q,
            //格式化JSON输出统一化
            JSONResponse(status, data, message) {
                return { status, data, message }
            },
            //全局工具方法
            appUtils
        })
        //进一步的配置
        Object.assign(
            global, {
                //全局程序配置文件路径 会根据CONFIG_MODE变化
                APP_CONFIG: require(pathTool.join(__dirname, '../../common/configs', `appConfig${CONFIG_MODE ? `-${CONFIG_MODE}` : ''}`)).default,
                //common目录路径
                COMMON_PATH: pathTool.join(__dirname, '../../common'),
            }
        )
        //其他初始化任务
        Object.assign(global,
            // tasks.run({ debug })
        )
    }
}



declare module NodeJS {
    interface Global {
        appUtils: any,
        LOGGER: any,
        APP_CONFIG: any,
        DB: any,
        _: any,
        ROOT_PATH: any,
        NODE_ENV: any,
        CONFIG_MODE: any,
        Q: any,
        COMMON_PATH: any,
        JSONResponse: any
    }
}