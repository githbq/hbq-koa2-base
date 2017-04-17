import json from 'koa-json';
import convert from 'koa-convert';
export default () => {
    return convert(json());
}