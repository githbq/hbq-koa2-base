import * as superagent from 'superagent'
import * as superagentPromise from 'superagent-promise'
let agent = superagentPromise(superagent, global.Promise)
//创建代理路由 
export let createAgentRouter = (router, action, routerUrl, remoteUrl, callback) => {
    router[action](routerUrl, async (ctx, next) => {
        try {
            let result
            if (action === 'post') {
                result = await agent.post(remoteUrl)
                    .type('form')
                    .send(ctx.request.fields.data)
                    .end()
            } else {
                result = await agent.get(remoteUrl)
                    .query(ctx.query)
                    .end()
            }
            ctx.body = { result: JSON.parse(result.text) }
            callback && callback(null, ctx, next)
        } catch (error) {
            ctx.body = { error, result: false }
            callback && callback(error, ctx, next)
        }
    })
}