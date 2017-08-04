/**
 * 资源
 */
export default (mongoose, Schema) => {
    return {
        //定义mongodb的字段
        props: {
            /**
             * 资源名称
             */
            name: {
                type: Schema.Types.String,
                required: true
            },
            /**
             * 描述
             */
            desc: {
                type: Schema.Types.String,
                required: false,
                default: ''
            },
            /**
             * 类型 music(音乐)|sound(音效)|file(文件) 
             */
            type: {
                type: Schema.Types.String,
                required: false,
                default: 'file'
            },
            /**
             * 地址
             */
            src: {
                type: Schema.Types.String,
                required: true
            },
            /**
           * 压缩后文件地址
           */
            minSrc: {
                type: Schema.Types.String,
                required: false,
                default: ''
            },
            /**
             * 其他相关数据
             */
            otherData: {
                type: Schema.Types.Object,
                required: false,
                default: {}
            },
            /**
             * 文件大小 KB
             */
            size: {
                type: Schema.Types.Number,
                required: true,
            },
            /**
             * 压缩后文件大小 KB
             */
            minSize: {
                type: Schema.Types.Number,
                default: 0,
                required: false,
            },
            /**
             * 尺寸信息
             */
            dimensions: {
                type: Schema.Types.Object,
                default: null,
                required: false,
            }
        },
        //静态方法
        statics: {}
    }
}