import modelBase from './base'
import * as mongoose from 'mongoose'
import getCommonProps from './commonProps'
import * as momentHelper from 'moment-helper'

const Schema = mongoose.Schema
//自动加载 无需人工引入文件  
export default {
    init({ debug }) {
        const requireHelper = appUtils.requireCommon('requireHelper')
        const database = {
            models: {}
        }
        const commonProps = getCommonProps(mongoose, Schema)
        requireHelper.requireDir([__dirname, 'models'], (getModel, modelName) => {
            const model = getModel(mongoose, Schema)
            model.collection = {
                collection: `${modelName}s`
            }
            /**
             * 继承公共属性
             */
            model.props = { ...commonProps, ...model.props }

            const modelSchema = new Schema(model.props, model.collection)
            modelSchema.pre('save', (next) => {
                this.createTime = (new Date()).getTime()
                this.updateTime = this.createTime
                this.createTimeString = momentHelper.get(this.createTime)
                this.updateTimeString = momentHelper.get(this.updateTime)
                next()
            })
            modelSchema.pre('update', (next) => {
                delete this.createTime
                delete this.createTimeString
                this.updateTime = (new Date()).getTime()
                this.updateTimeString = momentHelper.get(this.updateTime)
                console.log(this)
                next()
            })
            modelSchema.statics = { ...modelBase, ...model.statics }
            database.models[modelName] = mongoose.model(modelName, modelSchema)
            debug('load mongoose model --> ' + modelName)
        })
        return database
    }

}