import koaStatic from 'koa-static-cache';
import convert from 'koa-convert';
export default (path, prefix, options) => {
    return convert(
        koaStatic(
            path,
            Object.assign({
                prefix: prefix ? prefix : null,
                maxAge: 365 * 24 * 60 * 60,
                dynamic: true,
                gzip: true
            }, options)
        )
    )
}