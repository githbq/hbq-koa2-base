import * as Koa from 'koa'
import server from './server'
//加载中间件
export default {
    async init({ debug, logger }: any) {
        const app = new Koa()
        //支持 X-Forwarded-Host
        app.proxy = true
        //cookie 密钥
        //在进行cookie签名时，只有设置 signed 为 true 的时候，才会使用密钥进行加密：
        //ctx.cookies.set('name', 'tobi', { signed: true });
        app.keys = [APP_CONFIG.secret || 'secret key string']
        const middlewares = [
            'logger', //记录所用方式与时间 
            'globalError', // 全局错误处理
            'error', // 使用自定义错误
            'send', //send
            'favicon', //favicon
            'conditional', //配合etag
            'etag', //etag 客户端缓存处理
            'bodyParser', //body解析
            'json', // 传输JSON
            'views', //模板文件
            'session', //session处理 
            ['static', APP_CONFIG.staticPath], // 静态文件夹
            // // 文件上传对应的静态文件夹
            ['static', APP_CONFIG.uploadPath, '/' + APP_CONFIG.uploadStaticPrefix.replace(/^\//, '')],
        ]
        for (let n of middlewares) {
            const middleware = await this.loadMiddleware.apply(null, [].concat(n))
            //考虑返回多个中间件
            for (let m of [].concat(middleware)) {
                app.use(m)
            }
        }
        //其他始始化处理  router,sockets ... 
        await server.init(app, { debug, logger } as any)
        return app
    },
    async loadMiddleware(name, ...args) {
        const middleware = await require('./server/middlewares/' + name).default
        return (middleware && await middleware.apply(null, args)) || async function (ctx, next) { await next() }
    }
}