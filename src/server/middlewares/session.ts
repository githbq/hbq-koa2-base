import * as session from 'koa-session-minimal'
import * as MongooseStore from 'koa-session-mongoose'
export default () => {
    return [session({
        key: APP_CONFIG.sessionKey,
        store: new MongooseStore({
            collection: `${APP_CONFIG.sessionKey}s`,
            connection: DB.mongoose.connection,
            expires: 60 * 60 * 24 * 14, // 2 weeks is the default
            model: APP_CONFIG.sessionKey
        })
    }),
    //让sessionId附加到ctx上方便调用 
    async (ctx, next) => {
        //koa-cas2需要使用sessionStore这个名称
        !ctx.sessionStore && (ctx.sessionStore = ctx.session)
        if (!ctx.session.firstLoginTime) {
            ctx.session.firstLoginTime = Date.now()
        }
        const cookieValue = ctx.cookies.get(APP_CONFIG.sessionKey)
        if (!ctx.sessionId && ctx.cookies.get(APP_CONFIG.sessionKey)) {
            ctx.sessionId = cookieValue
        }
        await next()
    }
    ]
}