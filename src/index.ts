import globalIniter from './server/inits/global'
import * as http from 'http'
import * as deb from 'debug'
import * as chalk from 'chalk'
//打开浏览器
import * as open from 'open'
const debug = deb('server:default')
import appIniter from './app'
(async () => {
    //初始化全局变量
    await globalIniter.init({ debug })
    //初始化koa app
    let app
    try {
        app = await appIniter.init({ debug, logger: LOGGER })
    } catch (e) {
        console.error(e)
        return
    }
    //初始化全局变量
    const config = APP_CONFIG
    const starter = {
        app,
        server: http.createServer(app.callback()),
        port: process.env.PORT || config.port,
        run() {
            this.server.listen(this.port)
            this.server.on('listening', this.onListening)
            this.app.on('error', this.onError)
        },
        onError(error) {
            // if (error.syscall !== 'listen') {
            //     throw error
            // }
            let bind = 'Port ' + this.port
            switch (error.code) {
                case 'ECONNRESET':
                case 'ECANCELED':
                    {
                        //访问mp3之类静态资源会报错,但是不会影响功能使用 静默掉
                    }
                    break
                case 'EACCES':
                    appUtils.error(bind + ' requires elevated privileges')
                    process.exit(1)
                    break
                case 'EADDRINUSE':
                    appUtils.error(bind + ' is already in use')
                    process.exit(1)
                    break
                default:
                    {
                        LOGGER.error(error)
                    }
            }
        },
        onListening() {
            let { port } = this.address()
            appUtils.log(chalk.blue.bgWhite(`✅ 启动端口 http://127.0.0.1:${port}`))
        }
    }
    starter.run()

    //遇到EPIPE错误导致程序崩溃的时候 关闭程序
    process.stdout.on('error', function (err) {
        if (err.code === 'EPIPE') {
            process.exit(0)
        }
    })
    //遇到EPIPE错误 解决方案
    require('epipebomb')()
})()
/**demo for test */
export function add(a, b) {
    return a + b
}