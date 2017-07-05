import * as IO from 'koa-socket'
import * as cookieHelper from 'koa-socketio-cookie-helper'
import sockets from '../sockets'

export default {
    async init(app, { debug }) {
        const io = new IO()
        io.attach(app)
        // Initialize the socket cache
        await APP_CACHE.setAsync('socket-cache', [])
        io.use(async (ctx, next) => {
            await next()
        })
        io.on('io-test', (context, data) => {
            // Detects a successful response event
            context.socket.emit('io-test-response', 'socket.io was successful')
        })
        // The listening client connection stores the connection data and the current connection person into the cache
        io.on('connection', async (ctx, id) => {
            let clientSocket = ctx.socket
            let socketId = clientSocket.id
            let userId = cookieHelper.get(clientSocket, 'userId')
            // A detection event
            // Disconnect the corresponding cached data when disconnected
            clientSocket.on('disconnect', async () => {
                let socketCacheData = (await APP_CACHE.getAsync(`socket-cache`)) || []
                let index = _.findIndex(socketCacheData, { socketId })
                if (index >= 0) {
                    socketCacheData.splice(index, 1)
                }
                await APP_CACHE.setAsync('socket-cache', socketCacheData)
            })
            // Will be connected to the user id and socketId stored in the cache
            let socketCacheData = await APP_CACHE.getAsync(`socket-cache`)
            socketCacheData = socketCacheData || []
            socketCacheData.push({ socketId, userId })
            APP_CACHE.setAsync('socket-cache', socketCacheData)
        })
        // Mount specific events
        sockets(io, { debug })
    }
}