 import modelBase from './models/_base';
 import mongoose from 'mongoose';
 let requireHelper = appUtils.requireCommon('requireHelper');
 let Schema = mongoose.Schema;
 //自动加载 无需人工引入文件  
 export default {
     init({ debug }) {
         let database = {
             models: {}
         };
         requireHelper.requireDir([__dirname, 'models'], (getSchema, modelName) => {
             let schema = getSchema(mongoose, Schema);
             schema.collection = {
                 collection: `${modelName}s`
             };
             //创建时间 时间戳
             schema.Schema.createTime = {
                 type: Schema.Types.Number,
                 required: false
             };
             //创建时间 时间串 ('YYYY-MM-DD HH:mm:ss')
             schema.Schema.createTimeString = {
                 type: Schema.Types.String,
                 required: false
             };
             //更新时间 时间戳
             schema.Schema.updateTime = {
                 type: Schema.Types.Number,
                 required: false
             };
             //更新时间 时间串 ('YYYY-MM-DD HH:mm:ss')
             schema.Schema.updateTimeString = {
                 type: Schema.Types.String,
                 required: false
             };


             let modelSchema = new Schema(schema.Schema, schema.collection);
             modelSchema.pre('save', (next) => {
                 next();
             });
             modelSchema.pre('update', (next) => {
                 next();
             });
             _.each(_.extend({}, modelBase, schema.statics), (method, name) => {
                 modelSchema.statics[name] = method;
             });
             database.models[modelName] = mongoose.model(modelName, modelSchema);
             debug("load mongoose model --> " + modelName);
         });
         return database;

     }

 }