import * as bodyParser from 'koa-better-body'
import * as convert from 'koa-convert'
export default () => {
    return convert(bodyParser({ jsonLimit: 1024 * 1024 * 30 }))
}