/**
* Event name must be in such a prefix specification file name -what file name -what-response
*/
export default (io, { debug }) => {
    io.on('log', (context, data) => {
        // Detects a successful response event
        context.socket.emit('log-response', 'log-response')
    })
    io.on('log-test', (context, data) => {
        // Detects a successful response event
        context.socket.emit('log-test-response', 'log-response')
    })
}