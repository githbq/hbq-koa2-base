/**
* The public field is automatically inherited in ../index
*/
export default (mongoose, Schema) => {
    return {
        // Whether to delete the mark default value 0, 1 is deleted 0 is not deleted
        isDelete: {
            type: Schema.Types.Number,
            default: 0,
            required: false
        },
        // founder
        createUser: {
            type: Schema.Types.String,
            default: '',
            required: false
        },
        // Modify people
        updateUser: {
            type: Schema.Types.String,
            default: '',
            required: false
        },
        // Create time timestamp Date.now
        createTime: {
            type: Schema.Types.Number,
            required: false
        },
        // Create time formatted string 'YYYY-MM-DD HH:mm:ss'
        createTimeString: {
            type: Schema.Types.String,
            required: false
        },
        // Create time timestamp Date.now
        updateTime: {
            type: Schema.Types.Number,
            required: false
        },
        // Create time formatted string 'YYYY-MM-DD HH:mm:ss'
        updateTimeString: {
            type: Schema.Types.String,
            required: false
        },
        // version number
        version: {
            type: Schema.Types.String,
            default: '',
            required: false
        }
    }
}