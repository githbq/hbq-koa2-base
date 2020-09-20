import * as pathTool from 'path'
export default {
    // 是否启用 mongodb 链接 ，默认不启用
    useMongodb: false,
    mongodb: 'mongodb://127.0.0.1:17951/koa2Base',
    apiPrefix: 'api',
    hostPrefix: '', //应用程序上线域名前缀
    staticPath: pathTool.join(ROOT_PATH, 'public'),
    viewPath: pathTool.join(ROOT_PATH, 'views'),
    uploadPath: pathTool.join(ROOT_PATH, 'upload'),
    uploadStaticPrefix: 'upload',
    port: 4001,
    secret: 'koa2Base',
    projectName: 'koa2Base',
    //创建session的key会产生对应mongodb的集合`${sessionKey}s`
    sessionKey: 'appSession',
    staticFtp: {
        host: 'static.upload.xxdns.org',
        port: 21,
        user: 'ubu_wx_web',
        password: 'gJqLW0o4fJv'
    },
    getHostName(): string {
        return appUtils.isDev() ?
            `http://localhost:${this.port}` : 'http://xxx.xxx.com'
    },
    /**
     * 获取单点登陆配置
     */
    getSSOConfig(): SSOConfig {
        return appUtils.isDev() ?
            new SSOConfig(
                'https://sso.xxx.com:8443/gsso'
                , '/serviceValidate'
                , '/logout'
            )
            :
            new SSOConfig(
                'https://passport.xxx.com'
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
