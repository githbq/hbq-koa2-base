import convert from 'koa-convert' 
import respond from 'koa-respond'
export default  ()=> {
    return convert(respond())
}