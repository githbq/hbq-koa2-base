//自动挂载其他路由文件
import koaRouter from 'koa-router';
//log4js 日志工具
import log4js from 'koa-log4';
const requireHelper = appUtils.requireCommon('requireHelper');
export default {
    get({ debug }) {
        //支持多层级文件结构的路由了
        const pathInfo = requireHelper.requireRecurse(__dirname, '**/*.js', null, (name, dirname) => {
            return !((/^(helper|index|[_])/.test(dirname) || /^(index|_)/.test(name)));
        });
        //向以方法定义的路由文件注入 在生产模式时 以时间为后缀名的日志
        const logger = log4js.getLogger('log_date');
        return pathInfo.arr.map((n) => {
            let route = n.result;
            if (_.isFunction(n.result)) {
                //如果是以函数形式定义 route  
                route = koaRouter();
                //如果里面没有retur route 则直接使用引用传递的这个route
                route = n.result(route, { logger, debug }) || route;
            }
            return { route, name: n.fullname };
        });
    }
};