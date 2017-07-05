import modelBase from './base'
import * as mongoose from 'mongoose'
import getCommonProps from './commonProps'
import * as momentHelper from 'moment-helper'

const Schema = mongoose.Schema
// Automatic loading does not require manual import of files
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
* Inherit public attributes
*/
            model.props = { ...commonProps, ...model.props }

            const modelSchema = new Schema(model.props, model.collection)
            modelSchema.pre('save', function (next) {
                this.createTime = Date.now()
                this.updateTime = this.createTime
                this.createTimeString = momentHelper.get(this.createTime)
                this.updateTimeString = this.createTimeString
                next()
            })
            modelSchema.pre('update', function (next) {
                delete this.createTime
                delete this.createTimeString
                this.updateTime = Date.now()
                this.updateTimeString = momentHelper.get(this.updateTime)
                next()
            })
            modelSchema.statics = { ...modelBase, ...model.statics }
            database.models[modelName] = mongoose.model(modelName, modelSchema)
            debug('load mongoose model --> ' + modelName)
        })
        return database
    }

}