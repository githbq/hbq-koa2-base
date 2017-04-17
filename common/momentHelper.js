/**
 * 日期操作
 */
import moment from 'moment';
const momentHelper = {
    moment,
    formatType: {
        normal: 'YYYY-MM-DD HH:mm:ss',
        ymd: 'YYYY-MM-DD',
        ymdhm: 'YYYY-MM-DD HH:mm'
    },
    init() {
        moment.locale('zh-cn', {
            meridiem: function(hour, minute, isLowercase) {
                if (hour < 9) {
                    return "早上";
                } else if (hour < 11 && minute < 30) {
                    return "上午";
                } else if (hour < 13 && minute < 30) {
                    return "中午";
                } else if (hour < 18) {
                    return "下午";
                } else {
                    return "晚上";
                }
            }
        });
        return this;
    },
    getFormatType(type) {
        return (type && this.formatType[type]) || this.formatType.normal;
    },
    get(time, type) {
        return moment(time || new Date()).format(this.getFormatType(type));
    },
    format(time, formatString) {
        return moment(time || new Date()).format(formatString);
    }
};
export default momentHelper.init();