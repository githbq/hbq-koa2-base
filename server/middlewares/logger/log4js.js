import path from 'path';
import log4js from 'koa-log4';
export default () => {
    log4js.configure(appUtils.requireCommon('configs', 'log4js'), {
        reloadSecs: 300
    })
    return log4js.koaLogger(log4js.getLogger('http'), {
        level: 'auto'
    });
}