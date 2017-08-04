import * as lodash from 'lodash'
import appConfig from './common/configs/appConfig'
declare global {
    /**
     * lodash
     */
    const _: typeof lodash
    // 应用程序配置
    const APP_CONFIG: typeof appConfig
}