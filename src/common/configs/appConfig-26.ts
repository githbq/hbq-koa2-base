import appConfig from './appConfig'
import * as pathTool from 'path'
export default {
    ...appConfig,
    port: 4601,
    staticPath: pathTool.join(ROOT_PATH, '..', 'doraemon-platform-fe', 'dist'),
    mongodb: 'mongodb://doraemonUser:poilkjmnb.zxc@10.9.192.26:27058/doraemon', //远程数据库  
}