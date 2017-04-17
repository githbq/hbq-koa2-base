import convert from 'koa-convert';
import log4js from './log4js';
import logger from 'koa-logger';
export default () => {
    //日志
    if (!appUtils.isDev()) {
        return convert(log4js());
    } else {
        return convert(logger());
    }
}