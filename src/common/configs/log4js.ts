export default {
    appenders: [{
            category: 'log_date',
            type: 'dateFile',
            filename: './temp/logs/log_date/log_date',
            alwaysIncludePattern: true,
            pattern: '-yyyy-MM-dd.log'

        },
        {
            type: 'console',
            category: 'console'
        }
    ],
    replaceConsole: true,
    levels: {
        console: 'ALL',
        log_date: 'ALL'
    }
}