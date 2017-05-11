import * as favicon from 'koa-favicon'
import * as convert from 'koa-convert'
export default () => {
    return convert(favicon('../../public/favicon.ico'))
}