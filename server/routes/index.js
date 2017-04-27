//自动挂载其他路由文件  支持多层级文件结构的路由
import koaRouter from 'koa-router'
const { requireHelper } = appUtils.requireCommon()
export default {
    get({ debug, logger }) {
        const pathInfo = requireHelper.requireRecurse(__dirname, '**/*.js', null, (name, dirname) => {
            return !((/^(helper|index|[_])/.test(dirname) || /^(index|_)/.test(name)))
        })
        return pathInfo.arr.map((n) => {
            let route = n.result
                //n.fullname:  相对routes/的路径名称 example     /demo/db  
            if (_.isFunction(n.result)) {
                //如果是以函数形式定义 route  
                route = koaRouter()
                    //如果里面没有retur route 则直接使用引用传递的这个route
                const controller = appUtils.requireController(n.fullname)
                n.result(route, { logger, debug, controller: controller ? controller({ logger, debug }) : undefined })
            }
            return { route, name: n.fullname }
        })
    }
}