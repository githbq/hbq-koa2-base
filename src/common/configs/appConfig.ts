import * as pathTool from 'path'
export default {
    mongodb: 'mongodb://127.0.0.1:27017/koa2Base',
    apiPrefix: 'api',
    hostPrefix: '', // Application domain name prefix
    staticPath: pathTool.join(ROOT_PATH, 'public'),
    viewPath: pathTool.join(ROOT_PATH, 'views'),
    uploadPath: pathTool.join(ROOT_PATH, 'upload'),
    uploadStaticPrefix: 'upload',
    port: 31666,
    secret: 'koa2Base',
    projectName: 'koa2Base'
}