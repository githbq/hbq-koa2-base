import pathTool from 'path' 
import requireHelper from '../common/requireHelper'
//工具方法   在inits/initGlobal 挂到global上
export default {
    require(...paths) {
        const path = pathTool.join.apply(null, paths)
        try {
            return require(pathTool.join.apply(null, paths))
        } catch (e) {
            this.info(`appUtils: path:${path} not exists  `)
        }
    },
    requireLib(name) {
        return this.require(global.COMMON_PATH, 'libs', name)
    },
    requireController(...paths) {
        const controllerPathArr = [global.ROOT_PATH, 'server', 'controllers'];
        //如果没有传参数
        if (paths.length == 0) {

            return requireHelper.requireDirKV(controllerPathArr)
        }
        return this.require(...controllerPathArr, ...paths)
    },
    requireCommon(...paths) {
        //如果没有传参数
        if (paths.length == 0) {
            return requireHelper.requireDirKV(global.COMMON_PATH)
        }
        return this.require(global.COMMON_PATH, ...paths)
    },
    isDev() {
        return global.NODE_ENV !== 'production'
    },
    log() {
        if (this.isDev()) {
            console.log.apply(null, arguments)
        }
    },
    error() {
        if (this.isDev()) {
            console.error.apply(null, arguments)
        }
    }
}