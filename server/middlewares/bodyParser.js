import bodyParser from 'koa-better-body';
import convert from 'koa-convert';
export default () => {
    return convert(bodyParser({ jsonLimit: 1024 * 1024 * 30 }));
}