import * as views from 'koa-views'
export default () => {
    return views(APP_CONFIG.viewPath, {
        map: {
            pug: 'pug',
            html: 'ejs'
        }
    })
    // Supports multiple templates
    // views(__dirname + '/views-ejs', {
    //     extension: 'ejs'
    // })
}

// Example
// app.use(views(__dirname + '/views', {
//   extension: 'jade'
// }))