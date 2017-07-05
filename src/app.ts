import * as Koa from 'koa'
import server from './server'
// Load middleware
export default {
    async init({ debug, logger }: any) {
        const app = new Koa()
        // Support for X-Forwarded-Host
        app.proxy = true
        // Cookie key
        // When you make a cookie signature, you will only use the key for encryption when you set the signing to true:
        // Ctx.cookies.set ('name', 'tobi', {signed: true});
        app.keys = [APP_CONFIG.secret || 'secret key string']
        const middlewares = [
            'logger', // Record the way and time used
            'globalError', // Global error handling
            'error', // Use custom errors
            'send', // Send
            'favicon', // Favicon
            'conditional', // With etag
            'etag', // Etag client cache processing
            'bodyParser', // Body analysis
            'json', // Transfer JSON
            'views', // Template file
            'session', // Session processing
            ['static', APP_CONFIG.staticPath], // Static folder
            // // file upload the corresponding static folder
            ['static', APP_CONFIG.uploadPath, '/' + APP_CONFIG.uploadStaticPrefix.replace(/^\// , '')],
        ]
        for (let n of middlewares) {
            const middleware = await this.loadMiddleware.apply(null, [].concat(n))
            // Consider returning multiple middleware
            for (let m of [].concat(middleware)) {
                app.use(m)
            }
        }
        // Other initial processing router, sockets ...
        await server.init(app, { debug, logger } as any)
        return app
    },
    async loadMiddleware(name, ...args) {
        const middleware = await require('./server/middlewares/' + name).default
        return (middleware && await middleware.apply(null, args)) || async function (ctx, next) { await next() }
    }
}