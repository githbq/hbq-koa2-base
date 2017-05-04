import * as path from 'path'
import * as log4js from 'koa-log4'
export default () => {
    //在inits/tasks 初始化全局log4js配置
    return log4js.koaLogger(log4js.getLogger('http'), {
        level: 'auto'
    })
}