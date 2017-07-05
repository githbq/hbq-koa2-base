import globalIniter from './server/inits/global'
import * as http from 'http'
import * as deb from 'debug'
import * as chalk from 'chalk'
// Open the browser
import * as open from 'open'
const debug = deb('server:default')
import appIniter from './app'
(async () => {
    // Initialize global variables
    await globalIniter.init({ debug })
    // Initialize koa app
    let app
    try {
        app = await appIniter.init({ debug, logger: LOGGER })
    } catch (e) {
        console.error(e)
        return
    }
    // Initialize global variables
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
            // If (error.syscall! == 'listen') {
            // Throw error
            // }
            let bind = 'Port ' + this.port
            switch (error.code) {
                case 'ECONNRESET':
                case 'ECANCELED':
                    {
                        // Access to mp3 like static resources will be given, but will not affect the use of quiet function
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
            appUtils.log(chalk.blue.bgWhite(`✅ Running http://127.0.0.1:${port}`))
        }
    }
    starter.run()

    // The program closes when the EPIPE error causes the program to crash
    process.stdout.on('error', function (err) {
        if (err.code === 'EPIPE') {
            process.exit(0)
        }
    })
    // Encountered an EPIPE error solution
    require('epipebomb')()
})()
/** demo for test */
export function add(a, b) {
    return a + b
}