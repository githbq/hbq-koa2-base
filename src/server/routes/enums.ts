import {createSendRoute} from "./helper/send";
import {upload} from "./helper/upload";
/**
* Activity
*/
export default (route, { controller }) => {
    route.get('/rand', controller.bindAction('getRand'))
    route.get('/:type', controller.bindAction('getEnumByType'))
    createSendRoute(route, '/send1', ['upload', '1.jpg'])
   // route.post('/upload',  controller.bindAction('upload'))
    route.post('/upload', async (ctx, next) => {
        await  upload({})(ctx, next)
    })
}