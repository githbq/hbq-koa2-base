//自动挂载其他路由文件  支持多层级文件结构的路由
import * as KoaRouter from 'koa-router'
const { requireHelper } = appUtils.requireCommon()
export default {
    get({ debug, logger }) {
        const pathInfo = requireHelper.requireRecurse(__dirname, '**/*.(ts|js)', null, (name, dirname) => {
            return !((/^(helper|index|[_])/.test(dirname) || /^(index|_)/.test(name)))
        })
        return pathInfo.arr.map((n) => {
            let router = n.result
            //n.fullname:  相对routes/的路径名称 example     /demo/db  
            if (_.isFunction(n.result)) {
                //如果是以函数形式定义 route  
                router = KoaRouter()
                //如果里面没有retur route 则直接使用引用传递的这个route
                const controller = appUtils.requireController(n.fullname) || function () { return { __auto: true } }
                const actions = this.wrapController(controller({ logger, debug }), n.fullname)
                n.result(router, { logger, debug, controller: actions })
            }
            return { router, name: n.fullname }
        })
    },
    //对controller返回的对象进行包装
    wrapController(controllerActions: any = {}, routerName: string) {
        controllerActions.bindAction = function (action: string, getParams?: Function) {
            /**
             * 如果调用bindAction时不传第二个函数参数
             */
            getParams = getParams || function (ctx) {
                return [ctx.params, ctx.query, ctx.request.body.fields || ctx.request.body]
            }
            return async function (ctx, next) {
                if (controllerActions[action]) {
                    const params = await getParams(ctx)
                    const result = await controllerActions[action].apply(ctx, [].concat(params))
                    if (result === true) {//说明需要调用　next
                        await next()
                    } else {
                        ctx.body = result
                    }
                } else {
                    ctx.body = `未匹配到对应处理方法 @controller:${routerName} @action:${action}`
                }
            }
        }
        return controllerActions
    }
}