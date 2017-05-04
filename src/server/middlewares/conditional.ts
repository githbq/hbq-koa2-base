import * as conditional from 'koa-conditional-get'
import * as convert from 'koa-convert'
export default () => {
    return convert(conditional())
}