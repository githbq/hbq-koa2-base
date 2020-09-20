export default {
    appenders: {
        log_date: {
            type: 'dateFile',
            maxLogSize: 10485760, // 10MB
            filename: './temp/logs/log_date/log_date',
            alwaysIncludePattern: true,
            pattern: '-yyyy-MM-dd.log'
        }
    },
    categories: {
        default: {
            appenders: ['log_date'],
            level: 'error'
        }
    }
}