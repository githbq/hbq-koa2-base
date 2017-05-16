import * as pathTool from 'path'
export default {
    mongodb: 'mongodb://127.0.0.1:17951/koa2Base',
    apiPrefix: 'api',
    hostPrefix: '', //应用程序上线域名前缀
    staticPath: pathTool.join(ROOT_PATH, 'public'),
    viewPath: pathTool.join(ROOT_PATH, 'views'),
    uploadPath: pathTool.join(ROOT_PATH, 'upload'),
    uploadStaticPrefix: 'attachment',
    port: 6666,
    secret: 'koa2Base',
    projectName: 'koa2Base'
}