import * as etag from 'koa-etag'
import * as convert from 'koa-convert'
export default () => {
    return convert(etag())
}