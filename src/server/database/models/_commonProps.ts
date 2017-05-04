 /**
  * 公共字段  会在../index里自动承继
  */
 export default (mongoose, Schema) => {
     return {
         //是否删除标记 默认值0,    1为已删除 0为未删除
         isDelete: {
             type: Schema.Types.Number,
             default: 0,
             required: false
         },
         //创建人
         createUser: {
             type: Schema.Types.String,
             default: '',
             required: false
         },
         //修改人
         updateUser: {
             type: Schema.Types.String,
             default: '',
             required: false
         },
         //创建时间 时间戳  new Date().getTime()
         createTime: {
             type: Schema.Types.Number,
             default: 0,
             required: false
         },
         //创建时间格式化字符串 'YYYY-MM-DD HH:mm:ss'
         createTimeString: {
             type: Schema.Types.String,
             default: '',
             required: false
         },
         //创建时间 时间戳   new Date().getTime()
         updateTime: {
             type: Schema.Types.Number,
             default: 0,
             required: false
         },
         //创建时间格式化字符串 'YYYY-MM-DD HH:mm:ss'  
         updateTimeString: {
             type: Schema.Types.String,
             default: '',
             required: false
         },
         //版本号
         version: {
             type: Schema.Types.String,
             default: '',
             required: false
         }
     }
 }