import Koa from 'koa';
import server from './server';
//加载中间件
const loadMiddleware = (name, ...args) => {
    const middleware = require('./server/middlewares/' + name);
    return middleware.apply(null, args) || async function() {};
}
export default {
    init({ debug }) {
        const app = new Koa();
        //cookie 密钥
        //在进行cookie签名时，只有设置 signed 为 true 的时候，才会使用密钥进行加密：
        //ctx.cookies.set('name', 'tobi', { signed: true });
        app.keys = [global.APP_CONFIG.secret || "secret key string"];
        [
            'timeLogger', //请求消耗时间统计logger
            'globalError', // 全局错误处理
            'error', // 使用自定义错误
            'send', //send
            'favicon', //favicon
            'conditional', //配合etag
            'etag', //etag 客户端缓存处理
            'bodyParser', //body解析
            'json', // 传输JSON
            'logger', //记录所用方式与时间 
            'views', //模板文件
            'session', //session处理
            ['static', global.APP_CONFIG.staticPath], // 静态文件夹
            // 文件上传对应的静态文件夹
            ['static', global.APP_CONFIG.uploadPath, global.APP_CONFIG.uploadStaticPrefix],
        ].forEach(n => app.use(loadMiddleware.apply(null, [].concat(n))));

        //其他始始化处理
        server.init(app, { debug }); 
        return app;
    }
}