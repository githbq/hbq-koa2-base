import * as json from 'koa-json'
import * as convert from 'koa-convert'
export default () => {
    return convert(json())
}