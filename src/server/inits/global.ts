import * as pathTool from 'path'
import * as Bluebird from 'bluebird'
// Lodash
import * as lodash from 'lodash'
// Application tool library
import appUtils from '../appUtils'
// Need to perform initialization tasks such as database cache
import tasks from './tasks'
/**
* The global file is executed at the very beginning of the application
*/
export default {
    async init({ debug }) {
        // Add global objects to global
        Object.assign(global, {
            // Program root directory
            ROOT_PATH: process.cwd(),
            // Run mode development mode or other default is not pass for the development model development environment status production production environment status test test environment mode
            NODE_ENV: process.env.NODE_ENV || 'development',
            // Configuration mode acquiescence directly read common/configs/appConfig If configured, add a folder path common/configs/${CONFIG_MODE}/appConfig
            CONFIG_MODE: process.env.CONFIG_MODE || '',
            // The global promise is redefined as bluebird
            Promise: Bluebird,
            // Lu master object or collection operation auxiliary library
            _: lodash,
            // Format JSON output unified
            JSONResponse(status, data, message) {
                return { status, data, message }
            },
            // Global tool method
            appUtils,
            // Common directory path
            COMMON_PATH: pathTool.join(__dirname, '../../common')
        })

        // APP_CONFIG configuration
        Object.assign(
            global, {
                // The global program configuration file path changes according to CONFIG_MODE
                APP_CONFIG: require(pathTool.join(COMMON_PATH, 'configs', `appConfig${CONFIG_MODE ? `-${CONFIG_MODE}` : ''}`)).default,
            }
        )
        // Other initialization tasks
        Object.assign(global,
            await tasks.run({ debug })
        )

    }
} 