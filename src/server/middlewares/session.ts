import * as convert from 'koa-convert'
import * as session from 'koa-generic-session'
import * as MongooseStore from 'koa-session-mongoose'
export default () => { 
    return convert(
        session({
            store: new MongooseStore({
                collection: `${APP_CONFIG.projectName}Sessions`,
                connection: DB.mongoose.connection,
                expires: 60 * 60 * 24 * 14, // 2 weeks is the default
                model: `${APP_CONFIG.projectName}Session`
            })
        })
    )
}