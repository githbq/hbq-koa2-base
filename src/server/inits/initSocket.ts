import * as IO from 'koa-socket'
import * as cookieHelper from 'koa-socketio-cookie-helper'
import sockets from '../sockets'

export default {
    async init(app, { debug }) {
        const io = new IO()
        io.attach(app)
        //初始化socket缓存
        await APP_CACHE.setAsync('socket-cache', [])
        io.use(async (ctx, next) => {
            await next()
        })
        io.on('io-test', (context, data) => {
            //检测成功响应事件
            context.socket.emit('io-test-response', 'socket.io 成功了')
        })
        //监听客户端连接  会将连接数据,以及当前连接人 存入缓存
        io.on('connection', async (ctx, id) => {
            let clientSocket = ctx.socket
            let socketId = clientSocket.id
            let userId = cookieHelper.get(clientSocket, 'userId')
            //一个检测事件 
            //断开连接时 删除对应的缓存数据
            clientSocket.on('disconnect', async () => {
                let socketCacheData = (await APP_CACHE.getAsync(`socket-cache`)) || []
                let index = _.findIndex(socketCacheData, { socketId })
                if (index >= 0) {
                    socketCacheData.splice(index, 1)
                }
                await APP_CACHE.setAsync('socket-cache', socketCacheData)
            })
            //将本次连接的 用户id与socketId 存入缓存中
            let socketCacheData = await APP_CACHE.getAsync(`socket-cache`)
            socketCacheData = socketCacheData || []
            socketCacheData.push({ socketId, userId })
            APP_CACHE.setAsync('socket-cache', socketCacheData)
        })
        //挂载具体的事件
        sockets(io, { debug })
    }
}