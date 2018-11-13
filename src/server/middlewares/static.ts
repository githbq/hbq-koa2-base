import * as koaStatic from 'koa-static-cache'
export default (path, prefix, options) => {
    //最新版本 koa-static-cache prefix 必须以`/`开头 比如 `/upload`,默认加上这个前缀
    prefix && (prefix = '/' + prefix.replace(/^\//, ''))
    return koaStatic(
        path,
        {
            prefix: prefix || '',
            maxAge: 365 * 24 * 60 * 60,
            dynamic: true,
            gzip: true,
            ...options
        })
}