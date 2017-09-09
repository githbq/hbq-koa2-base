import * as pathTool from 'path'
import requireHelper from '../common/requireHelper'
//工具方法   在inits/initGlobal 挂到global上
export default {
  require(...paths) {
    const path = pathTool.join.apply(null, paths)
    try {
      const result = require(path)
      return (result && result.default) ? result.default : result
    } catch (e) {
      this.log(`appUtils: path:${path}`, e)
    }
  },
  requireController(...paths) {
    const controllerPathArr = [__dirname, 'controllers']
    //如果没有传参数
    if (paths.length === 0) {

      return requireHelper.requireDirKV(controllerPathArr)
    }
    return this.require(...controllerPathArr, ...paths)
  },
  /**
   * 获取攻举定义
   */
  getEnums() {
    return this.require(__dirname, 'enums')
  },
  requireCommon(...paths) {
    //如果没有传参数
    if (paths.length === 0) {
      return requireHelper.requireDirKV(COMMON_PATH)
    }
    const result = this.require(COMMON_PATH, ...paths)

    return result
  },
  isDev() {
    return NODE_ENV !== 'production'
  },
  isLogin() {
    return process.env.IS_LOGIN === true
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
