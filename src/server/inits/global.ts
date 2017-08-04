import * as pathTool from 'path'
import * as Bluebird from 'bluebird'
//lodash
import * as lodash from 'lodash'
//应用程序工具库
import appUtils from '../appUtils'
//需要执行的初始化任务 比如数据库 缓存库
import tasks from './tasks'
/**
 * global文件会在应用程序最开始被执行  优先执行
 */
export default {
    async init({ debug }) {
        //向global添加全局对象
        Object.assign(global, {
            //程序根目录
            ROOT_PATH: process.cwd(),
            //运行模式 开发模式还是其他 默认不传则为开发模式  development开发环境状态  production生产环境状态 test测试环境模式
            NODE_ENV: process.env.NODE_ENV || 'development',
            //配置模式 默认直接读common/configs/appConfig  如果配置了则增加一个文件夹路径   common/configs/${CONFIG_MODE}/appConfig 
            CONFIG_MODE: process.env.CONFIG_MODE || '',
            //全局promise重新定义为bluebird
            Promise: Bluebird,
            //鲁大师 对象或集合操作辅助库
            _: lodash,
            //格式化JSON输出统一化
            JSONResponse(status: Number, data, message = '', otherData = {}) {
                data = data || {}
                return { status, data, message, ...otherData }
            },
            //全局工具方法
            appUtils,
            //common目录路径
            COMMON_PATH: pathTool.join(__dirname, '../../common')
        })

        //APP_CONFIG 配置
        Object.assign(
            global, {
                //全局程序配置文件路径 会根据CONFIG_MODE变化
                APP_CONFIG: require(pathTool.join(COMMON_PATH, 'configs', `appConfig${CONFIG_MODE ? `-${CONFIG_MODE}` : ''}`)).default,
            }
        )
        //其他初始化任务
        Object.assign(global,
            await tasks.run({ debug })
        )

    }
} 