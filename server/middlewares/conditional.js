import conditional from 'koa-conditional-get';
import convert from 'koa-convert';
export default () => {
    return convert(conditional());
}