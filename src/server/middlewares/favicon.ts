import * as favicon from 'koa-favicon'
import * as pathTool from 'path'
export default () => {
    return favicon(pathTool.join(ROOT_PATH, 'public', 'favicon.ico'))
}