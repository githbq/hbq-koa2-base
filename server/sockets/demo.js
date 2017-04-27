/**
 * 事件名一定要以这样的前缀规范   文件名-what    文件名-what-response
 */
export default (io, { debug }) => {
    io.on('log', (context, data) => {
        //检测成功响应事件
        context.socket.emit('log-response', 'log-response')
    })
    io.on('log-test', (context, data) => {
        //检测成功响应事件
        context.socket.emit('log-test-response', 'log-response')
    })
}