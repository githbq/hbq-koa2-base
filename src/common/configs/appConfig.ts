import * as pathTool from 'path'
export default {
    mongodb: 'mongodb://127.0.0.1:17951/doraemon',
    apiPrefix: 'api',
    hostPrefix: '', //应用程序上线域名前缀
    // staticPath: pathTool.join(ROOT_PATH, 'public'),
    staticPath: pathTool.join(ROOT_PATH, '..', 'doraemon-platform-fe', 'dist'),
    viewPath: pathTool.join(ROOT_PATH, 'views'),
    uploadPath: pathTool.join(ROOT_PATH, 'upload'),
    uploadStaticPrefix: 'upload',
    port: 5601,
    secret: 'doraemon',
    projectName: 'doraemonPlatform',
    //创建session的key会产生对应mongodb的集合`${sessionKey}s`
    sessionKey: 'appSession',
    staticFtp: {
        host: 'static.upload.58dns.org',
        port: 21,
        user: 'ubu_wx_web',
        password: 'gJqLW0o4fJv'
    },
    getHostName(): string {
        return appUtils.isDev() ?
            `http://localhost:${this.port}` : 'http://h5.58corp.com'
    },
    /**
     * 获取单点登陆配置
     */
    getSsoConfig(): SSOConfig {
        return appUtils.isDev() ?
            new SSOConfig(
                'https://sso.test.58.com:8443/gsso'
                , '/serviceValidate'
                , '/logout'
            )
            :
            new SSOConfig(
                'https://passport.58corp.com'
                , '/serviceValidate'
                , '/logout'
            )
    }
}


class SSOConfig {
    public serverPath: string
    public validate: string
    public loginOut: string
    constructor(serverPath: string, validate: string, loginOut: string) {
        this.serverPath = serverPath
        this.validate = validate
        this.loginOut = loginOut
    }

}