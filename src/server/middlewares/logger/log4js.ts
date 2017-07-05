import * as path from 'path'
import * as log4js from 'koa-log4'
export default () => {
    // Initialize the global log4js configuration in inits/tasks
    return log4js.koaLogger(log4js.getLogger('http'), {
        level: 'auto'
    })
}