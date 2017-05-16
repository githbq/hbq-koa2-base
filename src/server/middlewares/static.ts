import * as koaStatic from 'koa-static-cache'
export default (path, prefix, options) => {
    return koaStatic(
        path,
        {
            prefix: prefix ? prefix : '',
            maxAge: 365 * 24 * 60 * 60,
            dynamic: true,
            gzip: true,
            ...options
        })
}