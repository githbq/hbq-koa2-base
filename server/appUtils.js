import path from 'path';
//工具方法   在inits/initGlobal 挂到global上
export default {
    require(...paths) {

        return require(path.resolve.apply(null, paths));
    },
    requireLib(name) {
        return this.require(global.COMMON_PATH, 'libs', name);
    },
    requireCommon(...paths) {
        //如果没有传参数
        if (paths.length == 0) {
            const requireHelper = this.requireCommon('requireHelper');
            return requireHelper.requireDirKV(global.COMMON_PATH);
        }
        return this.require(global.COMMON_PATH, ...paths);
    },
    isDev() {
        return global.NODE_ENV !== 'production';
    },
    log() {
        if (this.isDev()) {
            console.log.apply(null, arguments);
        }
    },
    error() {
        if (this.isDev()) {
            console.error.apply(null, arguments);
        }
    }
};