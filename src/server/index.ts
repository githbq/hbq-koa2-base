//初始化inits目录里面 文件名以init开头的文件  需要返回一个带有init方法的对象 否则不会进行初始化
export default {
    init(app, { debug }) {
        const requireHelper = appUtils.requireCommon('requireHelper')
        requireHelper.requireDir([__dirname, 'inits'], (item, name) => {
            name.match(/^init/) && item && item.init && (item.init(app, { debug }))
        })
    }
}