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
                 required: true,
                 default: ''
             },
             /**
              * 描述
              */
             desc: {
                 type: Schema.Types.String,
                 required: true,
                 default: ''
             },
             /**
              * 描述 music(音乐)|sound(音效)|file(文件) 
              */
             type: {
                 type: Schema.Types.String,
                 required: true,
                 default: ''
             },
             /**
              * 访问地址
              */
             src: {
                 type: Schema.Types.String,
                 required: true,
                 default: ''
             },
             /**
              * 其他相关数据
              */
             otherData: {
                 type: Schema.Types.Object,
                 required: false,
                 default: {}
             }
         },
         //静态方法
         statics: {}
     }
 }