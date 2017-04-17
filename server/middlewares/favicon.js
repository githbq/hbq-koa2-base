import favicon from 'koa-favicon';
import convert from 'koa-convert';
export default () => {
    return convert(favicon('../../public/favicon.ico'));
}