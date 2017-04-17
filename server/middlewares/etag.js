import etag from 'koa-etag';
import convert from 'koa-convert';
export default () => {
    return convert(etag());
}