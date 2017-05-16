import * as session from 'koa-session-minimal'
import * as MongooseStore from 'koa-session-mongoose'
export default () => {
    return session({
        store: new MongooseStore({
            collection: `${APP_CONFIG.projectName}Sessions`,
            connection: DB.mongoose.connection,
            expires: 60 * 60 * 24 * 14, // 2 weeks is the default
            model: `${APP_CONFIG.projectName}Session`
        })
    })
}