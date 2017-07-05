/**
* Define global smart hints
*/

// Declare namespace myLib {
// Export function encodechar (data: any, opts ?: any)
// }
// Application configuration
declare var APP_CONFIG: any
// Log4js log object
declare var LOGGER: any
// Application tool library
declare var appUtils: any
// JSONResponse unified json formatted output
declare var JSONResponse: (status: number, data: any, message?: string) => { status: number, data: any, message: string }
// The current program configuration mode, the default is '' then take src/common/configs/appConfig.ts if set to 26 use src/common/configs/appConfig-26.ts
declare var CONFIG_MODE: string
// Point to src/common absolute path
declare var COMMON_PATH: string
// Node program running environment state development | test | production
declare var NODE_ENV: string
// Point to cwd
declare var ROOT_PATH: string
// Persistent cache object
declare var APP_CACHE: any
// Lodash is now defined to -> shims.d.ts
// Declare var _: any
// Database operation object
declare var DB: { models: any, mongoose: any }