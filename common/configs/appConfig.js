import path from 'path';
export default {
    mongodb: 'mongodb://localhost:27017/koa2-base',
    apiPrefix: 'api',
    hostPrefix: '', //应用程序上线域名前缀
    staticPath: path.join(global.ROOT_PATH, '../koa2-base-fe/dist'),
    viewPath: path.join(global.ROOT_PATH, 'server', 'views'),
    uploadPath: path.join(global.ROOT_PATH, 'upload'),
    uploadStaticPrefix: 'attachment',
    port: 3602,
    secret: 'koa2-base',
    projectName: 'koa2-base',
    rootPath:process.cwd()
};