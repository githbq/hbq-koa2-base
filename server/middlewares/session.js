import convert from 'koa-convert';
import session from 'koa-generic-session';
import MongooseStore from 'koa-session-mongoose';
export default () => { 
    return convert(
        session({
            store: new MongooseStore({
                collection: `${APP_CONFIG.projectName}Sessions`,
                connection: global.DB.mongoose.connection,
                expires: 60 * 60 * 24 * 14, // 2 weeks is the default
                model: `${APP_CONFIG.projectName}Session`
            })
        })
    );
}