import convert from 'koa-convert';
import bodyParser from 'koa-better-body';
import respond from 'koa-respond';
export default  ()=> {
    return convert(respond());
}