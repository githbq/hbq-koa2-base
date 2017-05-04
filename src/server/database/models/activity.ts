 /**
  * 案例代码 
  */
 export default (mongoose, Schema) => {
     return {
         //定义mongodb的字段
         props: {
             /**
              * 业务线
              */
             tradeLine: {
                 type: Schema.Types.String,
                 required: true
             },
             /**
              * 活动类型 
              */
             type: {
                 type: Schema.Types.Number,
                 required: true
             },
             /**
              * 状态
              */
             state: {
                 type: Schema.Types.Number,
                 required: true,
                 default: 0
             },
             /**
              * 线上地址
              */
             address: {
                 type: Schema.Types.String,
                 required: true
             },
             /**
              * 活动名称
              */
             name: {
                 type: Schema.Types.String,
                 required: true
             },
             /**
              * 页码形式
              */
             pageNumber: {
                 type: Schema.Types.String,
                 required: true
             },
             /**
              * 背景音乐
              */
             music: {
                 type: Schema.Types.String,
                 required: false
             },
             /**
              * 翻页效果
              */
             pageTurning: {
                 type: Schema.Types.String,
                 required: false
             },
             /**
              * 音乐播放形式
              */
             musicPlayMode: {
                 type: Schema.Types.String,
                 required: false
             },
             /**
              * 推广开始时间  时间戳 new Date(date).getTime() 
              */
             effactStartTime: {
                 type: Schema.Types.Number,
                 required: false
             },
             /**
              *  推广开始 时间格式化字符串 'YYYY-MM-DD HH:mm:ss'
              */
             effactStartTimeString: {
                 type: Schema.Types.String,
                 required: false
             },
             /**
              * 推广结束时间  时间戳 new Date(date).getTime() 
              */
             effactEndTime: {
                 type: Schema.Types.Number,
                 required: false
             },
             /**
              *  推广结束 时间格式化字符串 'YYYY-MM-DD HH:mm:ss'
              */
             effactEndTimeString: {
                 type: Schema.Types.String,
                 required: false
             },
             /**
              * 允许调起
              */
             awake: {
                 type: Schema.Types.Boolean,
                 required: false,
                 default:false
             },
             share: {
                 coverSrc: {
                     type: Schema.Types.String,
                     required: false
                 },
                 title: {
                     type: Schema.Types.String,
                     required: false
                 },
                 desc: {
                     type: Schema.Types.String,
                     required: false
                 },
                 required: false
             }
         },
         //静态方法
         statics: {}
     }
 }