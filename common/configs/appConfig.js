import path from 'path';
export default {
    mongodb: 'mongodb://127.0.0.1:27017/koaBase',
    apiPrefix: 'api',
    hostPrefix: '', //应用程序上线域名前缀
    staticPath: path.join(global.ROOT_PATH, 'public'),
    viewPath: path.join(global.ROOT_PATH, 'server', 'views'),
    uploadPath: path.join(global.ROOT_PATH, 'upload'),
    uploadStaticPrefix: 'attachment',
    port: 7000,
    secret: 'koaBase',
    projectName: 'koaBase',
    rootPath: process.cwd()
};