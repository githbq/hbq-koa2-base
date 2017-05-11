import * as views from 'koa-views'
export default () => {
    return views(APP_CONFIG.viewPath, {
        map: {
            pug: 'pug',
            html:'ejs'
        }
    })
    //支持多种模板
    // views(__dirname + '/views-ejs', {
    //     extension: 'ejs'
    // })
}


//example
// app.use(views(__dirname + '/views', {
//   extension: 'jade'
// }))