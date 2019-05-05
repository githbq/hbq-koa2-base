import CAS from 'koa-cas'
/**
 * 单点登录   
 */
export default (router) => {
    const serviceUrl = APP_CONFIG.getHostName() + '/login'
    const cas = new CAS({
        baseUrl: APP_CONFIG.getSsoConfig().serverPath,
        service: serviceUrl,
        secureSSL: false,
    })
    //单点登入
    router.get('/login', async (ctx, next) => {
        let ticket = ctx.query.ticket
        if (!ticket) {
            //此处会跳转,不需要再调用next
           return cas.authenticate(ctx)
        }
        const result = await cas.validate(ticket, serviceUrl)
        if (result.status) {
            ctx.session.username = result.username
            ctx.session.userdata = result.extended
            ctx.cookies.set('username', result.username)
            ctx.cookies.set('ticket', result.extended.ticket)
            await ctx.redirect('/')
        }
    })
    //单点登出
    router.get('/logout', async (ctx, next) => {
        //此处会跳转,不需要再调用next
        ctx.session = {}
        ctx.cookies.set('username', '')
        ctx.cookies.set('ticket', '')
        cas.logout(ctx)
    })
}