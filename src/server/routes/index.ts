// Automatically mount other routing files to support routing of multi-level file structures
import * as koaRouter from 'koa-router'
const { requireHelper } = appUtils.requireCommon()
export default {
    get({ debug, logger }) {
        const pathInfo = requireHelper.requireRecurse(__dirname, '**/*.(ts|js)', null, (name, dirname) => {
            return !((/^(helper|index|[_])/.test(dirname) || /^(index|_)/.test(name)))
        })
        return pathInfo.arr.map((n) => {
            let route = n.result
            //n.fullname:  relative routes / path name example /demo/db
            if (_.isFunction(n.result)) {
                // if the route is defined as a function
                route = koaRouter()
                // If there is no retur route is directly used to pass the reference route
                const controller = appUtils.requireController(n.fullname) || function () { return { __auto: true } }
                const actions = this.wrapController(controller({ logger, debug }), n.fullname)
                n.result(route, { logger, debug, controller: actions })
            }
            return { route, name: n.fullname }
        })
    },
    // package the object returned by the controller
    wrapController(controllerActions: any = {}, routeName: string) {
        controllerActions.bindAction = function (action: string, getParams?: Function) {
            /**
             * If you call bindAction do not pass the second function parameters
             */
            getParams = getParams || function (ctx) {
                return [ctx.params, ctx.query, ctx.request.body.fields]
            }
            return async function (ctx, next) {
                if (controllerActions[action]) {
                    const params = await getParams(ctx)
                    const result = await controllerActions[action].apply(ctx, [].concat(params))
                    if (result === true) {// Description need to call next
                        await next()
                    } else {
                        ctx.body = result
                    }
                } else {
                    ctx.body = `does not match the corresponding processing method @controller:${routeName} @action:${action}`
                }
            }
        }
        return controllerActions
    }
}